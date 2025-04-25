import datetime
from email.policy import default

from odoo import models, fields, api


class PropertyOffer(models.Model):
    _name = "estate_property_offer"
    _description = "Property Offers"
    price = fields.Float(string="Price")
    status = fields.Selection(string="Property Status", selection=[('Accepted', 'Accepted'), ('Rejected', 'Rejected')],
                              copy=False)
    buyer_id = fields.Many2one(comodel_name='res.partner', string="Buyer")
    property_id = fields.Many2one(comodel_name='estate_property', string="Property")
    create_date = fields.Date(string="Create Date", default=fields.Date.today)
    validity = fields.Integer(string="Validity day", default=7)
    date_deadline = fields.Date(string="Deadline", compute='_compute_date_deadline', inverse='_inverse_date_deadline')

    @api.depends('create_date', 'validity')
    def _compute_date_deadline(self):
        for record in self:
            record.date_deadline = record.create_date + datetime.timedelta(days=record.validity)

    def _inverse_date_deadline(self):
        for record in self:
            delta = record.date_deadline - record.create_date
            record.validity = delta.days
