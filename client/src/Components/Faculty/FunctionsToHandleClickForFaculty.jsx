const handlefacultyClick = ({ Menu, navigate }) => {
    // console.log(Menu);
    if (!Menu.readOnly) {
      if (Menu.title === "Profile") {
        navigate("/faculty/facultyprofile");
      } else if (Menu.title === "Dashboard") {
        navigate("/faculty/dashboard");
      } else if (Menu.title === "My Divisons") {
        navigate("/faculty/divisions");
      } else if (Menu.title === "My Batches") {
        navigate("/faculty/batches"); 
      } else if (Menu.title === "Assignments") {
        navigate("/faculty/assignments");
      } else if (Menu.title === "Mentorship Groups") {
        navigate("/faculty/mentorshipgrps");
      } else if (Menu.title === "Chats") {
        navigate("/faculty/facultychats");
      }
    }
  };
  
  export default handlefacultyClick;
  