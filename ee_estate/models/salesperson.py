from odoo import models, fields, api


class SalesPerson(models.Model):
    _inherit = "res.users"
    property_ids = fields.One2many('estate_property', 'salesperson_id', string='Property')
