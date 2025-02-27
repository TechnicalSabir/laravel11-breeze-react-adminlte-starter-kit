import "datatables.net-dt/css/dataTables.dataTables.min.css";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import DataTable from 'datatables.net-dt';
import { useEffect, useRef } from 'react';
import { createRoot } from "react-dom/client";


const UserList = ({ title }) => {
    const userTableRef = useRef();
    useEffect(() => {
        const table = new DataTable(userTableRef.current, {
            pageLength: 50,
            processing: true,
            language: {
                search: "_INPUT_", // Removes the 'Search' field label
                searchPlaceholder: "Type here to search..", // Placeholder for the search box 
            },
            serverSide: true,
            ajax: route('users.ajax_list'),
            order: [
                [0, 'desc']
            ],
            rowCallback: (row, data, index) => {
                row.cells[0].classList.add('text-left')
                const actionCell = row.cells[3];
                actionCell.classList.add("text-center")
                if (!actionCell._reactRoot) {
                    actionCell._reactRoot = createRoot(actionCell)
                }
                actionCell._reactRoot.render(
                    <>
                        <Link href={route('users.edit', data[0])} className="text-success mx-2" title="Edit">
                            <i className="fa fa-edit" style={{ fontSize: "15px" }}></i>
                        </Link>
                        <Link href="#" data-id={data[0]} onClick={handle_delete} className="text-danger mx-2" title="Delete">
                            <i className="fa fa-trash-alt" style={{ fontSize: "15px" }}></i>
                        </Link>
                    </>
                )
            }
        })
    }, [])
    const handle_delete = (event) => {
        console.log(event);
        // if (confirm('Are you sure want to delete?')) {
        //     const curent_tr_elem = elem.parentElement.parentElement;
        //     const venue_id = elem.getAttribute('data-id');
        //     fetch(`https://weddingvenues.in/admin/venue/venue_delete/${venue_id}`).then(response => response.json()).then(data => {
        //         if (data.success === true) {
        //             curent_tr_elem.style.backgroundColor = "yellow";
        //             setTimeout(() => {
        //                 curent_tr_elem.remove();
        //             }, 100);
        //         }
        //         toastr[data.alert_type](data.message);
        //     })
        // }
    }
    return (
        <AuthenticatedLayout>
            <Head title={title} />
            <div className="content-wrapper">
                <div className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2 justify-content-between">
                                <h1 className="m-0">{title}</h1>
                                <Link href={route('users.create')} className="btn btn-success btn-sm">Add New</Link>
                        </div>
                    </div>
                </div>
                <div className="content">
                    <div className="container-fluid">
                        <div className="table-responsive text-sm">
                            <table ref={userTableRef} className="table dataTable">
                                <thead>
                                    <tr>
                                        <th className="text-left">ID</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th className="text-center">Action</th>
                                    </tr>
                                </thead>
                            </table>

                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

export default UserList