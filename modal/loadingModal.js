async function loadingModal() {
    Swal.fire({
        showConfirmButton: false,
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false,
        didOpen: () => {
            Swal.showLoading();
        },
    });

    const intervalTime = 5000;
    const timeoutTime = 120000;
    const startTime = Date.now();

    try {
        while(Date.now() - startTime < timeoutTime) {
            const status = await fetchWithTimeout(urlAuth);

            if(status == "true") {
                modalAuth();
            }

            await new Promise(resolve => setTimeout(resolve, intervalTime));
        }
        
        throw new Error("Tempo limite Excedido");

    } catch(error) {
        Swal.close();
        errorModal(error.message);
    }
}