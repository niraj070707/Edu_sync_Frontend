

const handleAdminClick = ({Menu, navigate}) => {
    // console.log(Menu);
    if (!Menu.readOnly) {
        if (Menu.title === "Add Faculty") {
            navigate("/admin/addfaculty");
        }else if(Menu.title === "Remove Faculty"){
            navigate("/admin/removefaculty");
        }else if(Menu.title === "Dashboard"){
            navigate("/admin/dashboard");
        }else if(Menu.title === "Profile"){
            navigate("/admin/adminprofile");
        }else if(Menu.title === "Faculty List"){
            navigate("/admin/facultylist");
        }else if(Menu.title === "Student List"){
            navigate("/admin/studentlist");
        }else if(Menu.title === "Add Division"){
            navigate("/admin/adddivision");
        }else if(Menu.title === "Add Batch"){
            navigate("/admin/addbatch");
        }else if(Menu.title === "Batch List"){
            navigate("/admin/batchlist");
        }else if(Menu.title === "Division List"){
            navigate("/admin/divisionlist");
        }
    }
};

export default handleAdminClick;
