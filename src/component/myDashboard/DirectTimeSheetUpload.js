import { api } from 'api/Api'
import { Options } from 'assets/svg'
import OnlyUploadWithChild from 'component/common/OnlyUploadWithChild'
import { DELETE_FILE_URL } from 'constants/ApiUrls'
import { ACCEPT_IMAGE_PDF, RESPONSE_CREATED, RESPONSE_OK } from 'constants/AppConstants'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Button, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from 'reactstrap'

export default function DirectTimeSheetUpload({
    data,
    handleUpdate
}) {

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    /**
     * The function toggleDropdown toggles the value of isDropdownOpen.
     */
    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const deleteFile = () => {
        let reqObj = { url: [data?.timeCardUrlForClinician] };
        let toastId = toast.loading('File is deleting...')
        api(DELETE_FILE_URL, reqObj).then((res) => {
            if (res.status === RESPONSE_OK || res.status === RESPONSE_CREATED) {
                toast.dismiss(toastId);
                handleUpdate(null)
            }
        }).catch(() => {
            toast.dismiss(toastId);
        });
    };

    return (
        <>
            {data?.timeCardUrlForClinician ?
                <div className=''>
                    {/* <a href={data?.timeCardUrlForClinician} target={"_blank"} rel={"noreferrer"}>Time Card</a> */}
                    <UncontrolledDropdown
                        setActiveFromChild
                        isOpen={isDropdownOpen}
                        toggle={toggleDropdown}
                        className="user-dropdown border-0"
                    >
                        <DropdownToggle tag="a" className="timeCard-clinician pointer">
                            <a>Time Card</a>
                        </DropdownToggle>
                        <DropdownMenu >

                            <DropdownItem tag={Link} to={data?.timeCardUrlForClinician} target={"_blank"} rel={"noreferrer"} className="">
                                <span>View</span>
                            </DropdownItem>
                            <DropdownItem tag={Link}
                                className="pointer" onClick={deleteFile}>
                                <span>Remove</span>
                            </DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                </div>
                :
                <Button id={"id" + data.id} className="table-dot" type="button">
                    {" "}
                    <OnlyUploadWithChild
                        multiple={false}
                        id="timeCard"
                        name={"timeCard"}
                        // accept={ACCEPT_IMAGE}
                        accept={ACCEPT_IMAGE_PDF}
                        folder="images"
                        max={1}
                        callbackFn={(res) => handleUpdate(res[0])}
                        serverFiles={[]}
                    >
                        <Options />
                    </OnlyUploadWithChild>
                </Button>
            }
        </>
    )
}
