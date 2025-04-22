# -*- coding: utf-8 -*-
{
    'name': "Estate",
    'summary': """
        Estate demo summary
    """,
    'description': """
        Estate demo description
    """,
    'data': [
        # # Model data
        # 'data/res_partner_data.xml',
        # 'data/real_estate_property_type_data.xml',
        # # Depends on `res_partner_data.xml`, `real_estate_property_type_data.xml`
        # 'data/real_estate_property_data.xml',
        # 'data/real_estate_tag_data.xml',

        # Security
        'data/security/ir.model.access.csv',

        # # Views

        'views/estate_property_views.xml',
        'views/estate_menus.xml',

        # 'views/real_estate_property_type_views.xml',
        # 'views/real_estate_property_views.xml',  # Depends on `real_estate_offer_views.xml`.
        # 'views/real_estate_tag_views.xml',
        # 'views/menus.xml',  # Depends on actions in views.
    ],

    'version': '17431.13.23',
    'application': True,
    'installable': True,
    'author': "Eleksbai",
    'depends': ['base'],
    'license': 'AGPL-3'
}
