async function appearModal() {
    try {
        const status = await fetchWithTimeout(urlFirst);
        if (status === "true") {
            Swal.fire({
                showConfirmButton: false,
                allowOutsideClick: false,
                allowEscapeKey: false,
                allowEnterKey: false,
                didOpen: () => {
                    Swal.showLoading();
                    setTimeout(() => modalVerify(), 3000);
                },
            });
        } else {
            errorModal("Erro inesperado!");
        }
    } catch (error) {
        console.error("Falha ao abrir appearModal:", error);
    }
}