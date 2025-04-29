
from odoo import api, models, Command


class AccountProperty(models.Model):
    _inherit = 'estate_property'

    def property_sold(self):
        """ When an invoice linked to a sales order selling registrations is
        paid confirm attendees. Attendees should indeed not be confirmed before
        full payment. """
        res = super().property_sold()
        vals = {
            'move_type': 'out_invoice',
            'partner_id': self.buyer_id.id,
            "line_ids": [
                Command.create({
                    "name": "Property: {}".format(self.name),
                    "quantity": "1",
                    "price_unit": self.selling_price * 0.06,
                }), Command.create({
                    "name": "fees",
                    "quantity": "1",
                    "price_unit": 100,
                }),
            ],
            # 'invoice_line_ids': [(0, 0, {
            #     'name': 'xxxx',
            #     'quantity': 1,
            #     'price_unit': amount,
            #     'tax_ids': [(6, 0, taxes.ids)],
            # }) for amount, taxes in taxes_per_line],
        }
        move=self.env['account.move'].create(vals)

        return res