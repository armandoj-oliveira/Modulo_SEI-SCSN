async function modalVerify() {
    const maxAttempts = 3;
    const interval = 3000;
    let attempts = 0;
    
    try {
        while (attempts < maxAttempts) {
            console.log(`Tentativa ${attempts + 1} de ${maxAttempts}`);
            const status = await fetchWithTimeout(urlAuth);
            
            if (status == "true") {
                modalAuth();
                return;
            } else { 
                Swal.fire({
                    title: "Autenticar",
                    html: `
                        <hr style="border: none; height: 3px; background: linear-gradient(to right, #ff7e5f, #feb47b);">
                        <br />
                        <div style="display: flex; justify-content: center; align-items: center;">
                            <a href='https://spp.go.senac.br/auth/signin-msc' target="_blank">
                                <button id="btnMicrosoft" style="
                                                            display: flex;
                                                            align-items: center;
                                                            padding: 10px 20px;
                                                            background-color: #f3f4f6;
                                                            border: 2px solid #d1d5db;
                                                            border-radius: 8px;
                                                            color: #1f2937;
                                                            font-weight: bold;
                                                            font-size: 14px;
                                                            cursor: pointer;
                                                            box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
                                                            transition: all 0.3s ease;"
                                    onmouseover="this.style.backgroundColor='#e5e7eb'; this.style.boxShadow='0px 5px 8px rgba(0, 0, 0, 0.2)';"
                                    onmouseout="this.style.backgroundColor='#f3f4f6'; this.style.boxShadow='0px 4px 6px rgba(0, 0, 0, 0.1)';">
                                    <svg height="32" width="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" style="margin-right: 10px;">
                                        <rect width="15" height="15" fill="#F15723"></rect>
                                        <rect x="17" width="15" height="15" fill="#34B67A"></rect>
                                        <rect y="17" width="15" height="15" fill="#51AED9"></rect>
                                        <rect x="17" y="17" width="15" height="15" fill="#FEC327"></rect>
                                    </svg>
                                    <span style="color: #1f2937;">Entrar com a Microsoft</span>
                                </button>
                            </a>
                        </div>
                    `,
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                    allowEnterKey: false,
                    showCloseButton: true,
                    showConfirmButton: false,
                    showCancelButton: false,
                    didOpen: () => {
                        btnActionAutenticate()
                    }
                });
                return;
            }
            attempts++;
            await new Promise(resolve => setTimeout(resolve, interval));
        }
        
        throw new Error("Falha ao obter confirmação após 3 tentativas!");

    } catch (error) {
        console.error("Falha ao abrir modalVerify:", error);
        errorModal("Erro", error.message);
    }
}