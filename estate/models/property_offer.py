import datetime
from email.policy import default

from odoo import models, fields, api
from odoo.exceptions import UserError


class PropertyOffer(models.Model):
    _name = "estate_property_offer"
    _description = "Property Offers"
    price = fields.Float(string="Price", required=True)
    state = fields.Selection(string="Property state", selection=[('Accepted', 'Accepted'), ('Rejected', 'Rejected')],
                             copy=False)
    buyer_id = fields.Many2one(comodel_name='res.partner', string="Buyer", required=True)
    property_id = fields.Many2one(comodel_name='estate_property', string="Property", required=True)
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

    def action_accept(self):
        for record in self:
            estate_property = record.property_id
            if estate_property.state == 'Sold':
                raise UserError("This property is already sold")
            elif estate_property.state == 'Cancelled':
                raise UserError("This property is Cancelled")
            elif estate_property.state == 'Offer Accepted':
                raise UserError("Another offer has already been accepted for this property.")
            if record.state == 'Accepted':
                raise UserError("This property is already accepted")
            estate_property.state = 'Offer Accepted'
            estate_property.buyer_id = record.buyer_id
            estate_property.selling_price = record.price
            record.state = 'Accepted'
            return True

    def action_refuse(self):
        for record in self:
            estate_property = record.property_id
            if estate_property.state == 'Sold':
                raise UserError("This property is already sold")
            elif estate_property.state == 'Cancelled':
                raise UserError("This property is Cancelled")
            if record.state == 'Rejected':
                raise UserError("This property is already Rejected")
            estate_property.state = 'Offer Received'
            estate_property.buyer_id = None
            estate_property.selling_price = None
            record.state = 'Rejected'
            return True

    def action_set_done(self):
        for record in self:
            pass
        return True
