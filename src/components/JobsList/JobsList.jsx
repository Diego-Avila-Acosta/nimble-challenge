import { useQuery } from "@tanstack/react-query"
import { jobsService } from "../../services/api"
import Job from "../Job/Job"


function JobList({postApplication}) {

    const { data, isFetching, isError, error, refetch } = useQuery({
        queryKey: ['jobs_list'],
        queryFn: jobsService.getAll,
    })

    if (isError) return (<h1>{`Error: ${error.message}`}</h1>)

    const jobs = data?.data;

    return (
        <div className="container py-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h2 className="fw-bold text-light mb-0">Listado de Postulaciones</h2>
                </div>
                <div>
                    <button className="btn btn-primary" onClick={refetch}>
                        <i className="bi bi-plus-lg me-2"></i>Actualizar
                    </button>
                </div>
            </div>

            
            <div className="card shadow-sm border-0 rounded-4 overflow-hidden">
                <div className="card-body p-0">
                    { isFetching ? <h3>Cargando...</h3> : 
                    <div className="table-responsive">
                        <table className="table table-hover align-middle mb-0">
                            <thead className="bg-light border-bottom">
                                <tr>
                                    <th className="py-3 ps-4 text-muted text-uppercase fw-bold" style={{fontSize: '0.8rem'}}>Titulo</th>
                                    <th className="py-3 text-muted text-uppercase fw-bold" style={{fontSize: '0.8rem'}}>Repositorio</th>
                                    <th className="py-3 pe-4 text-end text-muted text-uppercase fw-bold" style={{fontSize: '0.8rem'}}>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {jobs.length > 0 ? (
                                    jobs.map(job => (
                                        <Job
                                            key={job.id}
                                            id={job.id}
                                            title={job.title}
                                            postApplication={postApplication}
                                        />
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="3" className="text-center py-5 text-muted">
                                            No hay postulaciones abiertas
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    }
                </div>
            </div>
        </div>
    )
}


export default JobList