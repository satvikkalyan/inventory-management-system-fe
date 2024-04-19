import React, { useEffect, useState } from 'react';
import { Avatar, Button, TextField, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit'
import SaveIcon from '@mui/icons-material/Save';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import classes from './Profile.module.css'
import { useSelector } from 'react-redux';
const Profile = () => {
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        email: '',
        bio: 'This is a short bio...',
        mobileNumber: '',

    })
    const userToken = useSelector(state => state.user.userToken);
    const [editing, setEditing] = useState(false);
    const [profilePic, setProfilePic] = useState('');
    const handleEditToggle = () => {
        setEditing(!editing);
    };
    useEffect(() => {
        fetchUserDetails()
    }, [setUser])
    const fetchUserDetails = async () => {
        console.log(userToken.userToken, "user Token")
        try {
            const response = await fetch('http://localhost:8080/api/getUserDetails', {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${userToken.userToken}`,
                }
            })
            if (response.ok) {
                const userData = await response.json();
                console.log(userData);
                setUser({
                    firstName: userData.firstName || "John",
                    lastName: userData.lastName || "Doe",
                    email: userData.emailId || "samples@example.com",
                    bio: userData.bio || 'This is a short bio...',
                    mobileNumber: userData.mobileNumber || '817784402',
                })
                setProfilePic(userData.imageUrl)
            }
            else {
                console.error('Failed to fetch user Details:', response.status);
            }
        }
        catch (error) {
            setUser({
                firstName: "John",
                lastName: "Doe",
                email: "samples@example.com",
                bio: 'This is a short bio...',
                mobileNumber: '817784402',
            })
            console.error('Error fetching details', error)
        }
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const handleSave = async () => {
        try {
            const formData = new FormData();
            formData.append('firstName', user.firstName);
            formData.append('lastName', user.lastName);
            formData.append('email', user.email);
            formData.append('bio', user.bio);
            formData.append('mobileNumber', user.mobileNumber);

            if (profilePic instanceof File) {
                formData.append('profilePic', profilePic);
            }

            const response = await fetch('http://localhost:8080/api/updateUserDetails', {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${userToken.userToken}`,
                },
                body: formData,
            });

            if (response.ok) {
                const userData = await response.json();
                console.log(userData);
                setUser({
                    firstName: userData.firstName || "John",
                    lastName: userData.lastName || "Doe",
                    email: userData.emailId || "samples@example.com",
                    bio: userData.bio || 'This is a short bio...',
                    mobileNumber: userData.mobileNumber || '817784402',
                })
                setProfilePic(userData.imageUrl)

                console.log('User details updated successfully');

            } else {
                console.error('Failed to update user details:', response.status);
            }
        } catch (error) {
            console.error('Error updating user details:', error);
        }

        console.log('User details saved:', user);
        setEditing(false);
    };

    const handleFileChange = (e) => {
        if (e.target.files.length > 0) {
            setProfilePic(URL.createObjectURL(e.target.files[0]));
        }
    };
    return (
        <div className={classes.main_div}>
            <h2>User Profile</h2>
            {editing ? (
                <div className={classes.profile_container}>
                    <input
                        accept="image/*"
                        style={{ display: 'none' }}
                        id="profile-pic-upload"
                        type="file"
                        onChange={handleFileChange}
                    />
                    <label htmlFor="profile-pic-upload">
                        <IconButton color="primary" aria-label="upload picture" component="span">
                            <Avatar
                                src={profilePic}
                                sx={{ width: 150, height: 150 }}
                                alt={user.name}
                            >
                                {!profilePic && <AddAPhotoIcon style={{ fontSize: 50 }} />}
                            </Avatar>
                        </IconButton>
                    </label>
                    <TextField
                        label="firstName"
                        variant="outlined"
                        name="firstName"
                        value={user.firstName}
                        onChange={handleInputChange}
                        fullWidth
                    />
                    <TextField
                        label="lastName"
                        variant="outlined"
                        name="lastName"
                        value={user.lastName}
                        onChange={handleInputChange}
                        fullWidth
                    />
                    <TextField
                        label="Email"
                        variant="outlined"
                        name="email"
                        value={user.email}
                        InputProps={{
                            readOnly: true,
                        }}
                        onChange={handleInputChange}
                        fullWidth
                    />
                    <TextField
                        label="mobileNumber"
                        variant="outlined"
                        name="mobileNumber"
                        value={user.mobileNumber}
                        onChange={handleInputChange}
                        fullWidth
                    />
                    <TextField
                        label="Bio"
                        variant="outlined"
                        name="bio"
                        value={user.bio}
                        onChange={handleInputChange}
                        fullWidth
                        multiline
                        rows={4}
                    />
                    <Button
                        startIcon={<SaveIcon />}
                        variant="contained"
                        color="primary"
                        onClick={handleSave}
                    >
                        Save
                    </Button>
                </div>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
                    <Avatar
                        src={profilePic || 'path-to-default-avatar.png'}
                        sx={{ width: 150, height: 150 }}
                        alt={user.name}
                    />
                    <p>{user.firstName}</p>
                    <p>{user.lastName}</p>
                    <p>{user.email}</p>
                    <p>{user.mobileNumber}</p>
                    <p>{user.bio}</p>
                    <Button
                        startIcon={<EditIcon />}
                        variant="outlined"
                        color="primary"
                        onClick={handleEditToggle}
                    >
                        Edit
                    </Button>
                </div>
            )
            }
        </div>
    )
}
export default Profile;