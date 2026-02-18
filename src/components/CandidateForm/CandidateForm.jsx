import { useState } from "react";
import { candidateService } from "../../services/api";
import Swal from "sweetalert2";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function CandidateForm({candidate, setCandidate}) {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");

    const handleInput = (e) => {
        setEmail(() => e.target.value)
    }

    const handleGetCandidate = () => {
        if (!emailRegex.test(email)) {
            setError("El email no es un email valido");
            return;
        } else {
            setError("");
        }

        candidateService.get(email)
            .then((response) => {
                if (response.status === 200) {
                    setCandidate(response.data)
                    Swal.fire({
                        position: "bottom-right",
                        icon: "success",
                        title: "Se cargaron los datos del candidato",
                        showConfirmButton: false,
                        timer: 1000
                    });
                    return;
                } 
            })
            .catch((e) =>
                {
                    if(e.status == 404) {
                        Swal.fire({
                            icon: "error",
                            title: "404 Not Found",
                            text: "No se pudo encontrar el candidato con ese mail"
                        })
                    } else if(e.status == 400) {
                        Swal.fire({
                            icon: "error",
                            title: "400 Bad Request",
                            text: "Falta el parametro del email"

                        })
                    } else {
                        Swal.fire({
                            icon: "error",
                            title: "Oops...",
                            text: "Algo salió mal en la petición..."
                        })
                    }
                }
            ) 
    }

    return (
        <div className="container py-5">
            <div className="mb-3">
                <label for="email" className="form-label">Email:</label>
                <input type="email" className="form-control" name="email" id="email" value={email} onChange={handleInput} />
                <p></p>
                { error ? <label color="red">{error}</label> : null}
                <p></p>
                <button className="btn btn-primary" onClick={handleGetCandidate}>Conseguir datos</button>
            </div>



            { candidate.uuid ? 
                <div>
                    <h5>Datos del candidato</h5>
                    <ul>
                        <li>Nombre: {candidate.firstName}</li>
                        <li>Apellido: {candidate.lastName}</li>
                        <li>Email: {candidate.email}</li>
                        <li>Id de Candidato: {candidate.candidateId}</li>
                        <li>Id de Aplicación: {candidate.applicationId}</li>
                    </ul>
                </div>
             : <p>No hay datos de un candidato cargados</p> }
        </div>
    );

}

export default CandidateForm;