let selectedOption = null;
let additionalInfo = ""; 

function analyzeModal() {
    Swal.fire({
        title: "Documento",
        html: ` 
            <hr style="border: none; height: 3px; background: linear-gradient(to right, #ff7e5f, #feb47b);">
            <br />
            <fieldset style="border: 1px solid #ddd; padding: 20px; border-radius: 8px;">
                <div style="text-align: left; font-family: Arial, sans-serif; color: #333;">
                    ${generateTypes()}
                </div>
            </fieldset>
            <div style="background-color: #f0f0f0; padding: 20px; border-left: 5px solid #007acc; border-radius: 4px; margin-top: 20px; box-sizing: border-box;">
                <h3 style="margin: 0; color: #333; font-size: 1.25em;">Informações Adicionais:</h3>
                <textarea id="txtAreaInformation" style="width: calc(100% - 24px); margin-top: 10px; padding: 12px; border: 1px solid #ccc; border-radius: 8px; font-size: 14px; color: #333; 
                    background-color: #f9f9f9; resize: vertical; box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1); transition: all 0.3s ease;" 
                    placeholder="Insira as informações aqui">${additionalInfo}</textarea>
            </div>
            <br />
            <div style="display: flex; justify-content: center; align-items: center; gap: 20px;">
                <button id="btnContinue" style="padding: 10px 20px; background-color: #4CAF50; border: none; border-radius: 8px; color: white; font-weight: bold;
                        font-size: 14px; box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1); transition: all 0.3s ease; cursor: pointer;">
                            Prosseguir
                </button>
                <button id="btnCancel" style="padding: 10px 20px; background-color: #D3D3D3; border: none; border-radius: 8px; color: #333333; font-weight: bold;
                        font-size: 14px; box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1); transition: all 0.3s ease; cursor: pointer;">
                            Cancelar
                </button>
            </div>`,
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false,
        showCloseButton: true,
        showConfirmButton: false,
        showCancelButton: false,
        didOpen: () => {
            handleModalInteractions(); 
            btnActionContinue();
            btnActionCancel();
        }
    });
}

function generateTypes() {
    const options = [
        { legend: "Exemplo 1", id: "inexigibilidade", label: "Inexigibilidade", type: "radio", required: true },
        { legend: "Exemplo 2", id: "pregao", label: "Pregão", type: "checkbox", required: false },
        { legend: "Exemplo 3", id: "concorrencia", label: "Concorrência", type: "text", required: false },
        { legend: "Exemplo 4", id: "dispensa_licitacao", label: "Dispensa de Licitação", type: "button", required: false },
        { legend: "Exemplo 5", id: "tipo_selecao", label: "Tipo de Seleção", type: "select", selectOptions: ["Opção 1", "Opção 2", "Opção 3"], required: true }
    ];

    const groupedByLegend = options.reduce((groups, option) => {
        groups[option.legend] = groups[option.legend] || [];
        groups[option.legend].push(option);
        return groups;
    }, {});

    return Object.entries(groupedByLegend)
        .map(([legend, fields]) => {
            const fieldHtml = fields.map(option => {
                if (option.type === "select") {
                    const selectOptions = option.selectOptions
                        .map(opt => `<option value="${opt}">${opt}</option>`)
                        .join("");

                    return `
                        <div style="display: flex; align-items: center; margin-bottom: 12px;">
                            <label for="${option.id}" style="cursor: pointer; margin-right: 10px;">${option.label}:</label>
                            <select id="${option.id}" name="opcoes" 
                                style="padding: 8px; border: 1px solid #ccc; border-radius: 4px; cursor: pointer;">
                                ${selectOptions}
                            </select>
                        </div>`;
                }

                const checked = option.id === selectedOption ? "checked" : "";

                return `
                    <div style="display: flex; align-items: center; margin-bottom: 12px;">
                        <input type="${option.type}" id="${option.id}" name="opcoes" value="${option.label}" 
                            style="margin-right: 10px; accent-color: #007bff; cursor: pointer;" ${checked}>
                        <label for="${option.id}" style="cursor: pointer;">${option.label}</label>
                    </div>`;
            }).join("");

            return `
                <fieldset style="border: 1px solid #ddd; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
                    <legend style="font-weight: bold; color: #333;">${legend}</legend>
                    <div style="text-align: left; font-family: Arial, sans-serif; color: #333;">
                        ${fieldHtml}
                    </div>
                </fieldset>`;
        })
        .join("");
}

function handleModalInteractions() {

    document.querySelectorAll("input[name='opcoes']").forEach(checkbox => {
        checkbox.addEventListener("click", (e) => {
            document.querySelectorAll("input[name='opcoes']").forEach(cb => cb.checked = false);
            e.target.checked = true;
            selectedOption = e.target.id;
        });
    });


    const additionalInfoField = document.getElementById('txtAreaInformation');
    if (additionalInfoField) {
        additionalInfoField.addEventListener('input', (e) => {
            additionalInfo = e.target.value;
        });
    }
}
