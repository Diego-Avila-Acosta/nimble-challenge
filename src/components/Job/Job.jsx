import { useState } from "react";
import Swal from "sweetalert2";

function Job ({id, title, postApplication}) {
    const [repoUrl, setRepoUrl] = useState("")

    const handleInput = (e) => {
        setRepoUrl(() => e.target.value);
    }

    const handleSubmit = () => {
        if(repoUrl.trim() === "") {
            Swal.fire({
                icon: "error",
                title: "Error al enviar postulación",
                text: "Necesita ingresar una url de repositorio valido"
            })
            return;
        }

        postApplication(repoUrl, id);
    }

    return (
        <tr key={id} style={{cursor: 'pointer'}}>
            <td className="ps-4 fw-bold text-dark">
                {title}
            </td>
            <td>
                <input type="text" name="repoUrl" value={repoUrl} onChange={handleInput}/>
            </td>
            <td className="pe-4 text-end">
                <div className="d-flex justify-content-end gap-2">
                    <button 
                        className="btn btn-sm btn-outline-primary border-0 bg-primary bg-opacity-10 text-primary" 
                        title="Submit"
                        onClick={() => handleSubmit()}
                    >
                        Submit
                    </button>
                </div>
            </td>
        </tr>
    )
}

export default Job;