from odoo import models, fields, api

from dateutil.relativedelta import relativedelta


class PropertyType(models.Model):
    _name = "estate_property_type"
    _description = "Property Type"
    _order = "name"
    _sql_constraints = [
        ('unique_name', 'unique(name)', "A property type name must be unique.")
    ]

    name = fields.Char(string="Property Type", required=True, )
    property_ids = fields.One2many('estate_property', 'property_type_id', string="Property List")
    sequence = fields.Integer('Sequence', default=1, help="Used to order stages. Lower is better.")
    offer_ids = fields.One2many('estate_property_offer', 'property_type_id', "Offer List")
    offer_count = fields.Integer(compute='_compute_offer_count', string="Offer Count")

    @api.depends('offer_ids')
    def _compute_offer_count(self):
        for record in self:
            record.offer_count = len(record.offer_ids)

