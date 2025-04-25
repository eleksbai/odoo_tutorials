from odoo import models, fields

from dateutil.relativedelta import relativedelta


class PropertyType(models.Model):
    _name = "estate_property_type"
    _description = "Property Type"
    name = fields.Char(string="Property Type", required=True)
