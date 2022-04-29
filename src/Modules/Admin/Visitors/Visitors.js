

import { Fragment,useState, useEffect } from "react";
import { Table } from "antd";
import { TableProps } from "antd/lib/table";
import { render } from "react-dom";

import {Dialog, Menu, Transition} from '@headlessui/react'
import { RiNotificationLine,RiDashboardLine,RiKeyLine,RiUserLine,RiSecurePaymentLine,RiCalendarLine,RiShape2Line,RiSearch2Line } from 'react-icons/ri';

// @ts-ignore
import reqwest from "reqwest";
import LeftNavbar from '../../../Component/LeftNavbar';
import TopNavbar from '../../../Component/TopNavbar';


import "antd/dist/antd.css";
import React from "react";


function Visitors() {

    const [isLoading, setIsLoading] = useState(false);
    const [userList, setUserList] = useState([]);
    const [pagination, setPagination] = useState({});

    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [color, setColor] = useState();
    let [isOpen, setIsOpen] = useState(false)



    const customFetch = async (params = {}) => {
        console.log("params:", params);
        setIsLoading(true);
        const response = await reqwest({
            url: "https://randomuser.me/api",
            method: "get",
            data: {
                results: 5
            },
            type: "json"
        });
        console.log("response.results", response.results);
        setUserList(response.results);
        setIsLoading(false);
    };

    useEffect(() => {
        customFetch({});
    }, []);


  function closeModal() {
    setIsOpen(false)
  }

  function openModal(e) {
    e.preventDefault()
    setIsOpen(true)
  }

    const columns = [

        {
            title: "Visitor Name",
            dataIndex: "name",
            sorter: (a, b) => (a.name.first > b.name.first ? 1 : -1),
            render: (name) => `${name.first} ${name.last}`,
            width: "20%"
        },

        {
            title: "Phone Number",
            dataIndex: '',
            render: () => (
                <div>
                    <p className="font-semibold text-xs">08174526797</p>

                </div>
            )
        },


        {
            title: 'Date Created',
            dataIndex: '',

            render: () => (
                <div>
                    <p className="font-semibold text-xs">Oct 24th, 2020</p>
                    <p className="font-semibold text-xx">08:29 AM</p>
                </div>
            ),

            width: '20%',
        },
        {
            title: "Resident",
            dataIndex: '',
            render: () => (
                <div>
                    <p className="font-semibold text-xs">08174526797</p>

                </div>
            )
        },

        {
            title: 'Status',
            dataIndex: 'nat',
            render: (dataIndex) =>
                dataIndex === 'FR' ? (
                    <div className=" border p-1 border-green-600 text-green-500 rounded-3xl flex items-center justify-center">
                        Active
                    </div>
                ) : (
                    <div className=" border p-1 border-red-400  rounded-3xl text-red-500 flex items-center justify-center">
                        Inactive
                    </div>
                ),
            width: '10%',
        },
        {
            title: '',
            dataIndex: '',
            key: 'x',
            render: () =>
                <Menu as="div" className="relative inline-block text-left">
                    <div>
                        <Menu.Button className="px-4 py-2 text-xl font-medium text-black font-bold">
                            ...

                        </Menu.Button>
                    </div>
                    <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                    >
                        <Menu.Items className="absolute z-10 right-0 w-32 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <div className="px-1 py-1 ">
                                <Menu.Item>
                                    {({ active }) => (
                                        <button
                                            className={`${
                                                active ? ' text-gray-700' : 'text-green-500'
                                                } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                                        >

                                            Activate
                                        </button>
                                    )}
                                </Menu.Item>


                            </div>

                            <div className="px-1 py-1">
                                <Menu.Item>
                                    {({ active }) => (
                                        <button
                                            className={`${
                                                active ? 'color-theme text-white' : 'text-black'
                                                } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                                        >

                                            Edit News
                                        </button>
                                    )}
                                </Menu.Item>

                            </div>

                        </Menu.Items>
                    </Transition>
                </Menu>
          },
    ];

    const handleTableChange = (
        pagination,
        filters,
        sorter
    ) => {
        setPagination(pagination);
        customFetch({
            results: pagination.pageSize,
            page: pagination.current,
            sortField: sorter.field,
            sortOrder: sorter.order,
            ...filters
        });
    };

    const onSelectChange = (selectedRowKeys) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        setColor('red');
      }

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;




    return (
        <div>





      <div className="flex">
           <LeftNavbar/>

                <div className="w-10/12 flex flex-col body-bg">
                 <TopNavbar user ='Visitors'/>


                    <div className="flex justify-between ml-12 w-11/12 items-center mt-8">
                        <div
                            className="bg-white p-2  w-3/12 rounded-2xl px-6 flex items-center"
                        >
                            <input
                                type="text"
                                name=""
                                placeholder="search here..."
                                id=""
                                className="focus:outline-none bg-transparent w-11/12"
                            />

<RiSearch2Line/>

                        </div>


                        <div className="flex gap-4">
                            <button className="flex items-center gap-2 bg-customm py-2 px-3 color-theme font-semibold text-xs  rounded-sm">
                            <RiCalendarLine />
                            Date Filter</button>


                            <button className="flex items-center gap-2 bg-customm py-2 px-3 color-theme font-semibold text-xs  rounded-sm">
                            <RiCalendarLine />
                            Generate Report</button>


                        </div>
                    </div>




                    <div className="w-11/12 ml-12 mt-8">
                        <Table
                            rowSelection={rowSelection}
                            columns={columns}
                            dataSource={userList}
                            loading={isLoading}
                            onChange={handleTableChange}
                            pagination={pagination}
                            rowKey="email"
                        />


                    </div>
                </div>
            </div>
        </div>
    )
}

export default Visitors
