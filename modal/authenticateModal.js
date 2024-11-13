function modalAuth() {
        Swal.fire({
            title: "Documento - [NOME DOC]",
            subtitle: "teste",
            html: `
<hr style="border: none; height: 3px; background: linear-gradient(to right, #ff7e5f, #feb47b);">
            <br />
            <div style="display: flex; justify-content: center; align-items: center;">
                <button id="btnAnalyze" style="padding: 10px 20px; background-color: #1f2937; border: none; border-radius: 8px; color: white; font-weight: bold;
                        font-size: 14px; box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1); transition: all 0.3s ease;" 
                            onmouseover="this.style.backgroundColor='#374151';" onmouseout="this.style.backgroundColor='#1f2937';">
                    Analisar Documento
                </button>
            </div>
            <br>
            <div id="tableAnalyze"></div>
            `,
            allowOutsideClick: false,
            allowEscapeKey: false,
            allowEnterKey: false,
            showCloseButton: true,
            showConfirmButton: false,
            showCancelButton: false,
            didOpen: () => {
                btnActionAnalyze();
                renderAnalysisHistory();
            }
        });
}
