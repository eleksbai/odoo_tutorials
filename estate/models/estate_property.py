from odoo import models, fields, api

from dateutil.relativedelta import relativedelta
from odoo.exceptions import UserError


class EstateProperty(models.Model):
    _name = "estate_property"
    _description = "Estate Property"

    _sql_constraints = [
        ('check_expected_price', 'CHECK(expected_price >= 0)', 'A property expected price must be strictly positive.'),
        ('check_selling_price', 'CHECK(selling_price >= 0)', 'A property selling price must be positive.')
        , ('unique_name', 'unique(name)', "A property name must be unique.")
    ]

    name = fields.Char(string="Property Name", required=True)
    description = fields.Text(string="Property Description", copy=False)
    postcode = fields.Char(string="Property Postcode")
    date_availability = fields.Date(string="Property Date Availability", copy=False,
                                    default=fields.Date.today() + relativedelta(months=3))
    expected_price = fields.Float(string="Property Expected Price", required=True, )
    selling_price = fields.Float(string="Property Selling Price", readonly=True, copy=False)
    bedrooms = fields.Integer(string="Property Bedrooms", default=3)
    living_area = fields.Integer(string="Property Living Area")
    facades = fields.Integer(string="Property Facades")
    garage = fields.Boolean(string="Property Garage")
    garden = fields.Boolean(string="Property Garden")
    garden_area = fields.Integer(string="Property Garden Area")
    garden_orientation = fields.Selection(string="Property Garden Orientation",
                                          selection=[('North', '北'), ('South', '男'), ('West', '西'), ('East', '东')])
    property_type_id = fields.Many2one(comodel_name="estate_property_type", string="Property Type", required=True)
    buyer_id = fields.Many2one(comodel_name='res.partner', string='buyer', )
    salesperson_id = fields.Many2one(
        string="Salesperson", comodel_name='res.users', default=lambda self: self.env.user
    )
    tag_ids = fields.Many2many(comodel_name='estate_property_tag', string="Tags", )
    offer_ids = fields.One2many('estate_property_offer', 'property_id', string="Offers")
    total_area = fields.Float(compute="_compute_total", readonly=True, store=True)
    best_price = fields.Float(compute="_compute_best_price", readonly=True)
    offer_count = fields.Integer(compute="_compute_offer_count", readonly=True)
    active = fields.Boolean(string="Active", default=True)
    state = fields.Selection(string="Property Garden State", selection=[
        ('New', 'New'),
        ('Offer Received', 'Offer Received'),
        ('Offer Accepted', 'Offer Accepted'),
        ('Sold', 'Sold'),
        ('Cancelled', 'Cancelled'),
    ], default="New", required=True, copy=False)

    @api.depends("living_area", 'garden_area')
    def _compute_total(self):
        for record in self:
            record.total_area = record.living_area + record.garden_area

    def _compute_best_price(self):
        for record in self:
            if len(record.offer_ids) > 0:
                record.best_price = max(record.offer_ids.mapped('price'))
            else:
                record.best_price = None

    @api.onchange("garden")
    def _onchange_partner_id(self):
        if self.garden:
            self.garden_area = 10
            self.garden_orientation = 'North'
        else:
            self.garden_area = None
            self.garden_orientation = None

    def property_sold(self):
        for record in self:
            if record.state == 'Cancelled':
                raise UserError("This property is Cancel.")
            elif record.state == 'Sold':
                raise UserError("This property is already sold.")
            record.state = 'Sold'
        return True

    def property_cancel(self):
        for record in self:
            if record.state == 'Cancelled':
                raise UserError("This property is already Cancel.")
            elif record.state == 'Sold':
                raise UserError("This property is  sold.")
            record.state = 'Cancelled'
        return True

    @api.depends("living_area", 'garden_area')
    def _compute_offer_count(self):
        for record in self:
            record.offer_count = len(record.offer_ids)
