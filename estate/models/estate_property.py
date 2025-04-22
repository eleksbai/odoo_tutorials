from odoo import models, fields

from dateutil.relativedelta import relativedelta


class EstateProperty(models.Model):
    _name = "estate_property"
    _description = "Estate Property"

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

    active = fields.Boolean(string="Active", default=True)
    state = fields.Selection(string="Property Garden State", selection=[
        ('New', 'New'),
        ('Offer Received', 'Offer Received'),
        ('Offer Accepted', 'Offer Accepted'),
        ('Sold', 'Sold'),
        ('Cancelled', 'Cancelled'),
    ], default="New", required=True, copy=False)
