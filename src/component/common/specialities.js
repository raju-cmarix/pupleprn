import React from "react";
import Select from "react-dropdown-select";


function Specialties() {
    const specialties = [
        { value: 'Cardiovascular & Pulmonary Clinical', label: 'Cardiovascular & Pulmonary Clinical' },
        { value: 'Specialist (CCS)', label: 'Specialist (CCS)' },
        { value: 'Electrophysiology Clinical', label: 'Electrophysiology Clinical' },
        { value: 'Specialist (ECS)', label: 'Specialist (ECS)' },
        { value: 'Geriatric', label: 'Geriatric' },
        { value: 'Clinical Specialist (GCS)', label: 'Clinical Specialist (GCS)' },
        { value: 'Neurology Clinical Specialist (NCS)', label: 'Neurology Clinical Specialist (NCS)' },
        { value: 'Oncology Specialist', label: 'Oncology Specialist' },
        { value: 'Orthopedic Clinical Specialist (OCS)', label: 'Orthopedic Clinical Specialist (OCS)' },
        { value: 'Pediatric Clinical Specialist(PCS)', label: 'Pediatric Clinical Specialist(PCS)' },
        { value: 'Clinical Specialist (SCS)', label: 'Clinical Specialist (SCS)' },
        { value: 'Women’s Health', label: 'Women’s Health' },
        { value: 'Clinical Specialist (WCS)', label: 'Clinical Specialist (WCS)' },
        { value: 'Wound Management, Specialist (WMCS)', label: 'Wound Management, Specialist (WMCS)' },
    ]

  return (
    <Select options={specialties} placeholder="Select" />
  );
}



export default Specialties;
