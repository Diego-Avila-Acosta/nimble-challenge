import { useState } from "react";
import { candidateService } from "../../services/api";
import JobList from "../JobsList/JobsList";
import CandidateForm from "../CandidateForm/CandidateForm";
import Swal from "sweetalert2";

function Main() {
    const [candidate, setCandidate] = useState({});
    
    const postApplication = (repoUrl, jobId) => {
        if(!candidate.uuid) {
            Swal.fire({
                icon: "error",
                title: "Error al enviar postulación",
                text: "Necesita ingresar un candidato valido"
            })
            return;
        }

        const payload = {
            uuid: candidate.uuid,
            jobId,
            candidateId: candidate.candidateId,
            repoUrl,
            applicationId: candidate.applicationId
        }

        candidateService.post(payload).then((response) => {
            if(response.status == 200) {
                Swal.fire({
                    position: "bottom-right",
                    icon: "success",
                    title: "Se envió las postulación correctamente",
                    showConfirmButton: false,
                    timer: 1000
                });
            }
        }).catch((e) => {
            console.log(e.toJSON())
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Algo salió mal en la petición..."
            })
        })
    }

    return (
        <div>
            <CandidateForm 
                candidate={candidate}
                setCandidate={setCandidate}
            />
            <JobList
                postApplication={postApplication}
            />
        </div>
    );

}

export default Main;