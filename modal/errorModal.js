function errorModal(errorMessage) {
    Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Alguma coisa ocorreu! Recarregue a página caso necessário.",
        footer: `Error: ${errorMessage || "Erro desconhecido."}`,
        showConfirmButton: false,
        showCloseButton: true
    });
}