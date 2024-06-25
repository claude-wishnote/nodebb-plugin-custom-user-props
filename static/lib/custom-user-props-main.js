'use strict';
import { save, load } from 'settings';

$(window).on('action:ajaxify.end', async function () {
    if(ajaxify.data.template.name === 'account/edit'){
        console.log(ajaxify.data.customFields);
        const customFields = ajaxify.data.customFields;

        // ... 省略了一部分代码 ...
        const cusromArea = $('[component="profile/edit/form"]');
		const customFieldsReadNumber = $('<div/>', {
			style:'margin-top: 20px;margin-bottom: 20px;'
		});
        for (const field of customFields) {
            const divReadNumber = $('<div/>', {
                class: 'mb-3',
            });
            const label = $('<label/>', {
                for: field.name,
                text: field.name,
                class: 'form-label fw-bold'
            });
            if(field.type === 'select'){
                console.log(field);
                const options = field.options.split(',');
                const select = $('<select/>', {
                    id: field.name,
                    name: field.name,
                    class: 'form-control',
                }).append(
                    $('<option/>', { value: '', text: `Select a ${field.name}`, selected: !ajaxify.data[field.name] }),
                    options.map(option => $('<option/>', {
                        value: option,
                        text: option,
                        selected: option === ajaxify.data[field.name]
                    }))
                );
                divReadNumber.append(label, select);
            }else{
                const input = $('<input/>', {
                    type: 'text',
                    id: field.name,
                    name: field.name,
                    class: 'form-control',
                    placeholder: `Enter your ${field.name} here`,
                    value: ajaxify.data[field.name]??''
                });
                divReadNumber.append(label, input);
            }
            customFieldsReadNumber.append(divReadNumber);
        }
		//如果最后一个子元素是id=submitBtn,就将新生成的元素插入到submitBtn之前，否则直接append
		if(cusromArea.children().last().attr('id') === 'submitBtn'){
			cusromArea.children().last().before(customFieldsReadNumber);
		} else{
			cusromArea.append(customFieldsReadNumber);
		}
        cusromArea.append($('<div/>',{
            style: 'margin-bottom: 80px;', // 添加了底部边距
        }))
    }
});