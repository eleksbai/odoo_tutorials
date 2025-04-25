from odoo import models, fields


class PropertyTag(models.Model):
    _name = "estate_property_tag"
    _description = "Property Tags"
    name = fields.Char(string="Property Tag",   required=True)
    _sql_constraints = [
        ('unique_name', 'unique(name)', "A property tag name must be unique.")
    ]
