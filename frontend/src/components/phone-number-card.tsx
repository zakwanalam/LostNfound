import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import PhoneSelect from "./ui/phone-select"; // Assuming PhoneSelect component exists to handle the phone input
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import axios, { AxiosError, AxiosResponse } from "axios"
import { useLocation, useNavigate } from "react-router";
import { ApiErrorResponse } from "@/types/error-response";
import useLoadingNavigation from "@/utility-functions/loading-navigation";
import { loginSuccess } from "@/state/auth/loginSlice";
import { useDispatch } from "react-redux";

export function PhoneNumberCard() {
    const dispatch = useDispatch()
    const loadingNavigate = useLoadingNavigation()
    const [formData, setFormData] = useState({
        countryCode: "+1",
        phoneNumber: ""
    });
    const [isLoading, setIsLoading] = useState(false);
    const location = useLocation()
    const { accessToken } = location.state
    useEffect(() => {
        console.log(accessToken);
        console.log('formdata', formData)
    },)
    const handlePhoneChange = (phoneData: {
        country: { code: string, name: string, dialCode: string },
        nationalNumber: string,
        fullNumber: string,
        isValid: boolean
    }) => {
        setFormData({
            ...formData,
            phoneNumber: phoneData.nationalNumber, // or phoneData.nationalNumber if you prefer
            countryCode: phoneData.country.dialCode
        });
    };
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        const response = await axios.post("http://localhost:5086/api/auth/facebook", {
            accessToken,
            countryCode: formData.countryCode,
            phoneNumber: formData.phoneNumber,
        },{withCredentials:true}).then((res: AxiosResponse) => {
                console.log('Phone Number Submitted:', formData);
                alert("Phone number submitted successfully!");
                setIsLoading(false);

            const userData = res.data;
            if (userData) {
                dispatch(loginSuccess(userData))
                localStorage.setItem("userData", JSON.stringify(res.data))
                loadingNavigate('/');
            }
            
        }).catch((error: ApiErrorResponse) => {
            setIsLoading(false);
            console.log(error);
            alert(error.response.data.error + "\n" + error.response.data.msg);
            loadingNavigate('/signup')
        })
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100"> {/* Flexbox centering */}
            <div className="max-w-sm sm:max-w-md opacity-97">
                <Card>
                    <CardHeader className="text-center">
                        <CardTitle className="text-xl">Phone Number and Country Code</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit}>
                            <div className="grid gap-6">
                                <div className="grid gap-3">
                                    <Label htmlFor="phoneNumber">Phone Number</Label>
                                    <PhoneSelect
                                        onChange={handlePhoneChange}
                                        disabled={isLoading}
                                    />
                                </div>
                                <Button type="submit" className="w-full" disabled={isLoading}>
                                    {isLoading ? "Submitting..." : "Submit"}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );

}
