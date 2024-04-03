

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
        }
    }
};

export default handleAdminClick;
