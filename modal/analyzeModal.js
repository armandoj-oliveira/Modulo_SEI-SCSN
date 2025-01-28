let selectedOptions = [];
let additionalInfo = "";

function analyzeModal() {
    Swal.fire({
        title: "Documento",
        html: `
            <hr style="border: none; height: 3px; background: linear-gradient(to right, #ff7e5f, #feb47b);">
            <p style="color: #ff0000; font-weight: bold; font-size: 0.9em; margin-bottom: 10px;">
                Os campos marcados com * são obrigatórios.
            </p>
            <fieldset style="border: 1px solid #ddd; padding: 20px; border-radius: 8px;">
                <div style="text-align: left; font-family: Arial, sans-serif; color: #333;">
                    ${generateTypes()}
                </div>
            </fieldset>
            <div style="background-color: #f0f0f0; padding: 20px; border-left: 5px solid #007acc; border-radius: 4px; margin-top: 20px;">
                <h3 style="margin: 0; color: #333; font-size: 1.25em;">Informações Adicionais:</h3>
                <textarea id="txtAreaInformation" style="width: calc(100% - 24px); margin-top: 10px; padding: 12px; border: 1px solid #ccc; border-radius: 8px; font-size: 14px; 
                    background-color: #f9f9f9; resize: vertical; box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1); transition: all 0.3s ease;" 
                    placeholder="Insira as informações aqui">${additionalInfo}</textarea>
            </div>
            <br />
            <div style="display: flex; justify-content: center; align-items: center; gap: 20px;">
                <button id="btnContinue" style="padding: 10px 20px; background-color: #4CAF50; border: none; border-radius: 8px; color: white; font-weight: bold; font-size: 14px; cursor: not-allowed; opacity: 0.6;">
                    Prosseguir
                </button>
                <button id="btnCancel" style="padding: 10px 20px; background-color: #D3D3D3; border: none; border-radius: 8px; color: #333333; font-weight: bold; font-size: 14px;">
                    Cancelar
                </button>
            </div>`,
        allowOutsideClick: false,
        allowEscapeKey: false,
        showCloseButton: true,
        showConfirmButton: false,
        didOpen: () => {
            setupFieldListeners();
            setupButtonActions();
        }
    });
}

function generateTypes() {
    const options = [
        { legend: "Exemplo 2", id: "campo_texto", label: "Campo", type: "text", required: false },
        { legend: "Exemplo 5", id: "campo_opcao", label: "Opção", type: "select", selectOptions: ["Opção 1", "Opção 2", "Opção 3"], required: true }
    ];

    const groupedFields = options.reduce((groups, option) => {
        groups[option.legend] = groups[option.legend] || [];
        groups[option.legend].push(option);
        return groups;
    }, {});

    return Object.entries(groupedFields)
        .map(([legend, fields]) => `
            <fieldset style="border: 1px solid #ddd; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
                <legend style="font-weight: bold; color: #333;">${legend}</legend>
                ${fields.map(generateFieldHTML).join("")}
            </fieldset>`).join("");
}

function generateFieldHTML(option) {
    const label = `<label for="${option.id}" style="margin-right: 10px;">
        ${option.label}${option.required ? ' <span style="color: red;">*</span>' : ''}:
    </label>`;

    if (option.type === "select") {
        const selectOptions = option.selectOptions
            .map(opt => `<option value="${opt}">${opt}</option>`).join("");
        return `
            <div style="margin-bottom: 12px;">
                ${label}
                <select id="${option.id}" style="padding: 8px; border: 1px solid #ccc; border-radius: 4px; width: 100%;" ${option.required ? "required" : ""}>
                    <option value="">Selecione uma opção</option>
                    ${selectOptions}
                </select>
            </div>`;
    }

    return `
        <div style="margin-bottom: 12px;">
            ${label}
            <input type="${option.type}" id="${option.id}" style="padding: 8px; border: 1px solid #ccc; border-radius: 4px; width: 100%;" ${option.required ? "required" : ""}>
        </div>`;
}

function setupFieldListeners() {
    const fields = document.querySelectorAll("input, select, textarea");

    fields.forEach(field => {
        if (field.tagName === "SELECT" || field.type === "text") {
            field.addEventListener("input", () => handleFieldChange(field));
        } else if (field.id === "txtAreaInformation") {
            field.addEventListener("input", () => {
                additionalInfo = field.value.trim();
                validateContinueButton();
            });
        }
    });
}

function handleFieldChange(field) {
    const value = field.value.trim();

    if (value && !selectedOptions.includes(value)) {
        selectedOptions.push(value);
    } else if (!value) {
        selectedOptions = selectedOptions.filter(opt => opt !== value);
    }

    validateContinueButton();
}

function validateContinueButton() {
    const btnContinue = document.getElementById("btnContinue");
    const isValid = selectedOptions.length > 0 && additionalInfo.trim() !== "";

    if (btnContinue) {
        btnContinue.disabled = !isValid;
        btnContinue.style.cursor = isValid ? "pointer" : "not-allowed";
        btnContinue.style.opacity = isValid ? "1" : "0.6";
    }
}

function setupButtonActions() {
    const btnContinue = document.getElementById("btnContinue");
    const btnCancel = document.getElementById("btnCancel");

    if (btnContinue) {
        btnContinue.addEventListener("click", async () => {
            if (!validateFields()) {
                errorModal("Preencha todos os campos obrigatórios.");
                return;
            }

            Swal.showLoading();

            try {
                await fetchPost(selectedOptions, additionalInfo);
                selectedOptions = [];
                additionalInfo = "";
            } catch (error) {
                errorModal("Erro: " + error.message);
            }
        });
    }

    if (btnCancel) {
        btnCancel.addEventListener("click", () => confirmModal());
    }
}

function validateFields() {
    return selectedOptions.length > 0 && additionalInfo.trim() !== "";
}