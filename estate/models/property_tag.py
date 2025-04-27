from odoo import models, fields


class PropertyTag(models.Model):
    _name = "estate_property_tag"
    _description = "Property Tags"
    _order = "name"
    _sql_constraints = [
        ('unique_name', 'unique(name)', "A property tag name must be unique.")
    ]

    name = fields.Char(string="Property Tag", required=True)
    color = fields.Integer(string="Color",  )