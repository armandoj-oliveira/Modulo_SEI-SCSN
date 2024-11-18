function confirmModal() {
    Swal.fire({
        title: "CUIDADO!!!",
        icon: "warning",
        text: "Tem certeza que quer cancelar? Todos os dados serão perdidos!",
        confirmButtonText: "Sim",
        cancelButtonText: "Não",
        showCloseButton: true,
        showCancelButton: true,
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false
    }).then((result) => {
        if(result.isConfirmed) {
            Swal.close();
        } else {
            analyzeModal();
        }
    })
}