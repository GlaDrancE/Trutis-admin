import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Building2, User, Phone, Mail, MapPin, CreditCard, Calendar, Users, Tag } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { getClient } from '../../../services/api';
import toast from 'react-hot-toast';

const ClientDetails = () => {
    const params = useParams();
    const [client, setClient] = useState<any>();
    const ClientDetails = {
        shopName: "Tech Store",
        ownerName: "John Doe",
        address: "123 Main St, City",
        phone: "+1 234-567-8900",
        email: "john@techstore.com",
        logo: "/api/placeholder/200/100",
        googleAPI: "API-KEY-123",
        isActive: true,

        subscription: {
            price: "$99/month",
            benefits: ["Unlimited Products", "24/7 Support", "Analytics"],
            startDate: "2024-01-01",
            expireDate: "2025-01-01",
            paymentMode: "Credit Card",
            autoPayment: true
        },

        agent: {
            name: "Sarah Smith",
            phone: "+1 234-567-8901",
            email: "sarah@agency.com",
            address: "456 Agent St, City"
        },

        coupons: [
            { id: "CPU001", customer: "Alice Brown", status: "Used" },
            { id: "CPU002", customer: "Bob Wilson", status: "Used" },
            { id: "CPU003", customer: "", status: "New" }
        ]
    };
    useEffect(() => {
        const { client_id } = params;
        if (!client_id) {
            toast("Invalid id or Id not found")
            return
        }
        fetchClient(client_id);
    }, [])
    const fetchClient = async (client_id: string) => {
        const response = await getClient(client_id);
        if (!response.data) {
            console.log("Failed to fetch client details", response.status)
            toast.error(response.data)
            return;
        }
        console.log(response.data)
        setClient(response.data)
    }
    if (!client) {
        return (
            <div>
                Loading...
            </div>
        )
    }
    return (
        <div className="p-6 max-w-7xl mx-auto space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
                {/* Client Details */}
                <Card className="md:col-span-2">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle className="text-blue-600">Client Details</CardTitle>
                        <Badge variant="outline" className={client.isActive ? "bg-green-100" : "bg-red-100"}>
                            {client.isActive ? "Active" : "Inactive"}
                        </Badge>
                    </CardHeader>
                    <CardContent className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-4">
                            <img src={client.logo} alt="Shop Logo" className="rounded-lg" />
                            <div className="flex items-center gap-2">
                                <Building2 className="text-blue-600" size={20} />
                                <span className="font-medium">{client.shopName}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <User className="text-blue-600" size={20} />
                                <span>{client.ownerName}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <MapPin className="text-blue-600" size={20} />
                                <span>{client.address}</span>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div className="flex items-center gap-2">
                                <Phone className="text-blue-600" size={20} />
                                <span>{client.phone}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Mail className="text-blue-600" size={20} />
                                <span>{client.email}</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Subscription Plan */}
                <Card>
                    {/* <CardHeader>
                        <CardTitle className="text-blue-600">Subscription Plan</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center gap-2">
                            <CreditCard className="text-blue-600" size={20} />
                            <span className="font-medium">{client.subscription.price}</span>
                        </div>
                        <div className="space-y-2">
                            {client.subscription.benefits.map((benefit, index) => (
                                <div key={index} className="flex items-center gap-2">
                                    <span className="text-blue-600">•</span>
                                    <span>{benefit}</span>
                                </div>
                            ))}
                        </div>
                        <div className="flex items-center gap-2">
                            <Calendar className="text-blue-600" size={20} />
                            <div className="flex flex-col">
                                <span>Start: {client.subscription.startDate}</span>
                                <span>Expire: {client.subscription.expireDate}</span>
                            </div>
                        </div>
                    </CardContent> */}
                    TODO: Subscription Plan Show
                </Card>

                {/* Agent Details */}
                <Card>
                    {/* <CardHeader>
                        <CardTitle className="text-blue-600">Agent Associate</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center gap-2">
                            <Users className="text-blue-600" size={20} />
                            <span className="font-medium">{client.agent.name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Phone className="text-blue-600" size={20} />
                            <span>{client.agent.phone}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Mail className="text-blue-600" size={20} />
                            <span>{client.agent.email}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <MapPin className="text-blue-600" size={20} />
                            <span>{client.agent.address}</span>
                        </div>
                    </CardContent> */}
                    TODO: Agnet Details Show
                </Card>

                {/* Coupon Codes */}
                {/* <Card className="md:col-span-2">
                    <CardHeader>
                        <CardTitle className="text-blue-600">Coupon Codes</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b">
                                        <th className="text-left p-2">ID</th>
                                        <th className="text-left p-2">Customer</th>
                                        <th className="text-left p-2">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {client.coupons.map((coupon, index) => (
                                        <tr key={index} className="border-b">
                                            <td className="p-2">
                                                <div className="flex items-center gap-2">
                                                    <Tag className="text-blue-600" size={16} />
                                                    {coupon.id}
                                                </div>
                                            </td>
                                            <td className="p-2">{coupon.customer || '-'}</td>
                                            <td className="p-2">
                                                <Badge variant="outline" className={coupon.status === 'Used' ? 'bg-gray-100' : 'bg-green-100'}>
                                                    {coupon.status}
                                                </Badge>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card> */}
                TODO: Coupon Codes Show
            </div>
        </div>
    );
};

export default ClientDetails;