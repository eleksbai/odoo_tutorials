from odoo import models, fields


class PropertyOffer(models.Model):
    _name = "estate_property_offer"
    _description = "Property Offers"
    price = fields.Float(string="Price")
    status = fields.Selection(string="Property Status", selection=[('Accepted', 'Accepted'), ('Rejected', 'Rejected')],
                              copy=False)
    buyer_id = fields.Many2one(comodel_name='res.partner', string="Buyer")
    property_id = fields.Many2one(comodel_name='estate_property', string="Property")
