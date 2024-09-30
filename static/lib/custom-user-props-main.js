'use strict';
import { save, load } from 'settings';

$(window).on('action:ajaxify.end', async function () {
    if (ajaxify.data.template.name === 'account/edit') {
		const translator = await app.require('translator');
		const customFields = ajaxify.data.customFields || [];
        const userData = ajaxify.data;

        const customArea = $('[component="profile/edit/form"]');
        const customFieldsContainer = $('<div/>', {
            style: 'margin-top: 20px;margin-bottom: 20px;'
        });

        for (const field of customFields) {
            const fieldContainer = $('<div/>', {
                class: 'mb-3',
            });
            const label = $('<label/>', {
                for: field.name,
                text: await translator.translate(field.label),
                class: 'form-label fw-bold'
            });

            if (field.type === 'select') {
                const options = field.options.split(',');
                const select = $('<select/>', {
                    id: field.name,
                    name: field.name,
                    class: 'form-control',
                }).append(
                    $('<option/>', { value: '', text: await translator.translate(`[[custom-user-props:select-a]] ${await translator.translate(field.label)}`), selected: !userData[field.name] }),
                    options.map(option => $('<option/>', {
                        value: option,
                        text: option,
                        selected: option === userData[field.name]
                    }))
                );
                fieldContainer.append(label, select);
            } else {
                const input = $('<input/>', {
                    type: 'text',
                    id: field.name,
                    name: field.name,
                    class: 'form-control',
                    placeholder: await translator.translate(`[[custom-user-props:enter-your]] ${await translator.translate(field.label)}`),
                    value: userData[field.name] || ''
                });
                fieldContainer.append(label, input);
            }
            customFieldsContainer.append(fieldContainer);
        }

        if (customArea.children().last().attr('id') === 'submitBtn') {
            customArea.children().last().before(customFieldsContainer);
        } else {
            customArea.append(customFieldsContainer);
        }
        customArea.append($('<div/>', {
            style: 'margin-bottom: 80px;',
        }));
    }
});