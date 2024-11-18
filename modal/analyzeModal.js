function analyzeModal() {
    Swal.fire({
        title: "ANALISE",
        html: ` 
            <hr style="border: none; height: 3px; background: linear-gradient(to right, #ff7e5f, #feb47b);">
            <br />
            <fieldset style="border: 1px solid #ddd; padding: 20px; border-radius: 8px;">
                <legend style="font-weight: bold; color: #333;"> Selecione uma Modalidade </legend>
                <div style="text-align: left; font-family: Arial, sans-serif; color: #333;">
                    <div style="display: flex; align-items: center; margin-bottom: 12px;">
                        <input type="checkbox" id="inexigibilidade" name="opcoes" value="Inexigibilidade" 
                            style="margin-right: 10px; accent-color: #007bff; cursor: pointer;" onclick="handleCheckboxClick(this)">
                        <label for="inexigibilidade" style="cursor: pointer;">Inexigibilidade</label>
                    </div>
                    <div style="display: flex; align-items: center; margin-bottom: 12px;">
                        <input type="checkbox" id="pregao" name="opcoes" value="Pregao" 
                            style="margin-right: 10px; accent-color: #007bff; cursor: pointer;" onclick="handleCheckboxClick(this)">
                        <label for="pregao" style="cursor: pointer;">Pregão</label>
                    </div>
                    <div style="display: flex; align-items: center; margin-bottom: 12px;">
                        <input type="checkbox" id="concorrencia" name="opcoes" value="Concorrencia" 
                            style="margin-right: 10px; accent-color: #007bff; cursor: pointer;" onclick="handleCheckboxClick(this)">
                        <label for="concorrencia" style="cursor: pointer;">Concorrência</label>
                    </div>
                    <div style="display: flex; align-items: center; margin-bottom: 12px;">
                        <input type="checkbox" id="dispensa_licitacao" name="opcoes" value="Dispensa de Licitacao" 
                            style="margin-right: 10px; accent-color: #007bff; cursor: pointer;" onclick="handleCheckboxClick(this)">
                        <label for="dispensa_licitacao" style="cursor: pointer;">Dispensa de Licitação</label>
                    </div>
                </div>
            </fieldset>
            <div style="background-color: #f0f0f0; padding: 20px; border-left: 5px solid #007acc; border-radius: 4px; margin-top: 20px; box-sizing: border-box;">
                <h3 style="margin: 0; color: #333; font-size: 1.25em;">Informações Adicionais:</h3>
                <textarea style="width: calc(100% - 24px); margin-top: 10px; padding: 12px; border: 1px solid #ccc; border-radius: 8px; font-size: 14px; color: #333; 
                    background-color: #f9f9f9; resize: vertical; box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1); transition: all 0.3s ease;" 
                    placeholder="Insira as informações aqui"></textarea>
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
            valueCheckbox();
        }
    });
}

function handleCheckboxClick(checkbox) {
    document.querySelectorAll("input[name='opcoes']").forEach(cb => {
        cb.checked = false;
    });
    checkbox.checked = true;
}
