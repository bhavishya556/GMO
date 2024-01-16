import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Typography from '@mui/material/Typography';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import initialDepartments from "./data"



const SecondComponent = () => {


    

    
   
      
      
      
    
    
  

    const [departments, setDepartments] = useState<Record<number, { checked: boolean, subDepartmentsChecked: Record<number, boolean> }>>(
        initialDepartments.reduce((acc, department) => {
          (acc as Record<number, { checked: boolean, subDepartmentsChecked: Record<number, boolean> } >)[department.id] = {
            checked: false,
            subDepartmentsChecked: {},
          };
          department.subDepartments.forEach((subDepartment) => {
            (acc as Record<number, { checked: boolean, subDepartmentsChecked: Record<number, boolean> } >)[department.id].subDepartmentsChecked[subDepartment.id] = false;
          });
          return acc;
        }, {})
      );
      
      const [expandedDepartments, setExpandedDepartments] = useState<Record<number, boolean>>(
        initialDepartments.reduce((acc, department) => {
          (acc as Record<number, boolean>)[department.id] = false;
          return acc;
        }, {})
      );

  const handleDepartmentChange = (departmentId: number) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDepartments((prevDepartments) => {
      const updatedDepartments = { ...prevDepartments };
      updatedDepartments[departmentId].checked = event.target.checked;
  
      // If a department is checked, check all its sub-departments
      if (event.target.checked) {
        Object.keys(updatedDepartments[departmentId].subDepartmentsChecked).forEach(
          (subDepartmentId:any) => {
            updatedDepartments[departmentId].subDepartmentsChecked[subDepartmentId] = true;
          }
        );
      } else {
        // If a department is unchecked, uncheck all its sub-departments
        Object.keys(updatedDepartments[departmentId].subDepartmentsChecked).forEach(
          (subDepartmentId:any) => {
            updatedDepartments[departmentId].subDepartmentsChecked[subDepartmentId] = false;
          }
        );
      }


  
      return updatedDepartments;
    });
  };
  

  const handleSubDepartmentChange = (departmentId: number, subDepartmentId: number) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDepartments((prevDepartments) => {
      const updatedDepartments = { ...prevDepartments };
      updatedDepartments[departmentId].subDepartmentsChecked[subDepartmentId] =
        event.target.checked;

      // If all sub-departments are checked, check the department
      if (
        Object.values(updatedDepartments[departmentId].subDepartmentsChecked).every(
          (value) => value
        )
      ) {
        updatedDepartments[departmentId].checked = true;
      } else {
        updatedDepartments[departmentId].checked = false;
      }

      return updatedDepartments;
    });
  };

  const handleToggleDepartment = (departmentId: number) => {
    setExpandedDepartments((prevExpanded) => ({
      ...prevExpanded,
      [departmentId]: !prevExpanded[departmentId],
    }));
  };

  return (
    <Box>
      <Typography component="h1" variant="h5" m={2} sx={{ textAlign: 'center' }} color={"primary"}>
        Second Component
      </Typography>

      {initialDepartments.map((department) => (
        <Box key={department.id} sx={{ marginLeft:"10px" }} >
          <FormControlLabel
            label={department.name}
            control={
              <Checkbox
                checked={departments[department.id].checked}
                onChange={handleDepartmentChange(department.id)}
              />
              
            }
            
          />
          {expandedDepartments[department.id] ? (
            <FaChevronUp
              onClick={() => handleToggleDepartment(department.id)}
              style={{ marginBottom: '-5px', marginLeft: '5px', cursor: 'pointer' }}
            />
          ) : (
            <FaChevronDown
              onClick={() => handleToggleDepartment(department.id)}
              style={{ marginBottom: '-5px', marginLeft: '5px', cursor: 'pointer' }}
            />
          )}

          {expandedDepartments[department.id] && (
            <Box sx={{ display: 'flex', flexDirection: 'column', ml: 3 }}>
              {department.subDepartments.map((subDepartment) => (
                <FormControlLabel
                  key={subDepartment.id}
                  label={subDepartment.name}
                  control={
                    <Checkbox
                      checked={departments[department.id].subDepartmentsChecked[subDepartment.id]}
                      onChange={handleSubDepartmentChange(department.id, subDepartment.id)}
                    />
                  }
                />
              ))}
            </Box>
          )}
        </Box>
      ))}
    </Box>
  );
};

export default SecondComponent;
