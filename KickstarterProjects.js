import React, { useEffect, useState } from "react";
import { Table, Pagination } from "../Components/Pagination";

const KickstarterProjects = () => {
    const [projects, setProjects] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const projectsPerPage = 5;

    useEffect(() => {
        fetch("https://raw.githubusercontent.com/saaslabsco/frontend-assignment/refs/heads/master/frontend-assignment.json")
            .then((response) => response.json())
            .then((data) => setProjects(data))
            .catch((error) => console.error("Error fetching data:", error));
    }, []);

    const totalPages = Math.ceil(projects.length / projectsPerPage);
    const handlePageChange = (page) => setCurrentPage(page);

    const paginatedProjects = projects.slice(
        (currentPage - 1) * projectsPerPage,
        currentPage * projectsPerPage
    );

    return (
        <div className="p-4">
            <h2 className="text-2xl mb-4">Kickstarter Projects</h2>
            <Table>
                <thead>
                    <tr>
                        <th>S.No.</th>
                        <th>Percentage funded</th>
                        <th>Amount pledged</th>
                    </tr>
                </thead>
                <tbody>
                    {paginatedProjects.map((project, index) => (
                        <tr key={index}>
                            <td>{(currentPage - 1) * projectsPerPage + index + 1}</td>
                            <td>{Math.round((project.pledged / project.goal) * 100)}</td>
                            <td>{project.pledged}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
        </div>
    );
};

export default KickstarterProjects;
