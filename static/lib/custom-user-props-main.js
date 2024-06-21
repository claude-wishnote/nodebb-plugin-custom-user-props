'use strict';
import { save, load } from 'settings';

$(window).on('action:ajaxify.end', async function () {
    if(ajaxify.data.template.name === 'account/edit'){
		console.log(ajaxify.data.customFields);
		const customFields = ajaxify.data.customFields;

        // ... 省略了一部分代码 ...
        const cusromArea = $('[component="profile/edit/form"]');
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
			cusromArea.append(divReadNumber);
		}
        // const snsUrlReadNumber =  $('<div/>', {
        //     class: 'mb-3',
        // });
        // const snsUrlLabel = $('<label/>', {
        //     for: 'snsUrl',
        //     text: 'SNS URL',
        //     class: 'form-label fw-bold'
        // });
        // const snsUrlInput = $('<input/>', {
        //     type: 'text',
        //     id: 'snsUrl',
        //     name: 'snsUrl',
        //     class: 'form-control',
        //     placeholder: 'Enter your SNS URL here',
        //     value: ajaxify.data?.snsUrl??''
        // });
        // snsUrlReadNumber.append(snsUrlLabel, snsUrlInput);
        // // if (cusromArea.length) {
        // cusromArea.append(snsUrlReadNumber);
        // // }
        // // else if ($('.profile .fullname').length) {
        // //     // fallbacks for themes that don't have above component
        // //     divReadNumber.insertAfter('.profile .fullname');
        // // } else if ($('.account .fullname').length) {
        // //     // fallbacks for themes that don't have above component
        // //     divReadNumber.insertAfter('.account .fullname');
        // // }
        // const domainTypeReadNumber = $('<div/>', {
        //     class: 'mb-3',
        // });
        // //是个selector, 包含beauty, health, baby, travel...
        // const domainTypeOptions = ['beauty', 'health', 'baby', 'travel']; // 添加更多选项
        // const domainTypeLabel = $('<label/>', {
        //     for: 'domainType',
        //     text: 'Domain Type',
        //     class: 'form-label fw-bold'
        // });
        // const domainTypeSelector = $('<select/>',
        //     {
        //         id: 'domainType',
        //         name: 'domainType',
        //         class: 'form-control',
        //      }
        // ).append(
        //     $('<option/>', { value: '', text: 'Select a domain type', selected: !ajaxify.data?.domainType }),
        //     domainTypeOptions.map(option => $('<option/>', {
        //         value: option,
        //         text: option,
        //         selected: option === ajaxify.data?.domainType
        //     }))
        // );
        // domainTypeReadNumber.append(domainTypeLabel,domainTypeSelector)
        // cusromArea.append(domainTypeReadNumber);
        // // followerSize(selection: less than 5k, 10k, 50k, 100k, more than 100k)
        // const followerSizeOptions = ['less than 5k', '10k', '50k', '100k', 'more than 100k'];
        // const followerSizeLabel = $('<label/>', {
        //     for: 'followerSize',
        //     text: 'Follower Size',
        //     class: 'form-label fw-bold'
        // });
        // const followerSizeSelector = $('<select/>',
        //     {
        //         id: 'followerSize',
        //         name: 'followerSize',
        //         class: 'form-control',
        //     }
        // ).append(
        //     $('<option/>', { value: '', text: 'Select a follower size', selected: !ajaxify.data?.followerSize }),
        //     followerSizeOptions.map(option => $('<option/>', {
        //         value: option,
        //         text: option,
        //         selected: option === ajaxify.data?.followerSize
        //     }))
        // );
        // const followerSizeReadNumber = $('<div/>', {
        //     class: 'mb-3',
        // });
        // followerSizeReadNumber.append(followerSizeLabel, followerSizeSelector);
        // cusromArea.append(followerSizeReadNumber);

        // // platform(instagram, youtube, tiktok, naver)
        // const platformOptions = ['instagram', 'youtube', 'tiktok', 'naver'];
        // const platformLabel = $('<label/>', {
        //     for: 'platform',
        //     text: 'Platform',
        //     class: 'form-label fw-bold'
        // });
        // const platformSelector = $('<select/>',
        //     {
        //         id: 'platform',
        //         name: 'platform',
        //         class: 'form-control',
        //         style: 'margin-bottom: 50px;', // 添加了底部边距
        //     }
        // ).append(
        //     $('<option/>', { value: '', text: 'Select a platform', selected: !ajaxify.data?.platform }),
        //     platformOptions.map(option => $('<option/>', {
        //         value: option,
        //         text: option,
        //         selected: option === ajaxify.data?.platform
        //     }))
        // );
        // const platformReadNumber = $('<div/>', {
        //     class: 'mb-3',
        // });
        // platformReadNumber.append(platformLabel, platformSelector);
        // cusromArea.append(platformReadNumber);
    }
});