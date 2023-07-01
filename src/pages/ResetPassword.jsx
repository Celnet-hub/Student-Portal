import React, { Component } from "react";
import { LockClosedIcon } from "@heroicons/react/solid";
export default class ResetPassword extends Component {
    render() {
        return (
            
            <>
            <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-lg w-full space-y-8">
                    <div>
                        <img
                            className="mx-auto h-12 w-auto"
                            src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                            alt="Workflow"
                        />
                        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                            Use Your Matric Number to Reset Your Password
                        </h2>
                        <div>
                        <LockClosedIcon className="h-25 w-25 text-gray-600" />
                        </div>
                    </div>
                    <form className="mt-8 space-y-6" action="#" method="POST">
                        <input type="hidden" name="remember" defaultValue="true" />
                        <div className="rounded-md shadow-sm -space-y-px">
                            <div>
                                <label htmlFor="matric-no" className="sr-only">
                                    Matriculation Number
                                </label>
                                <input
                                    id="matric-no"
                                    name="matric-no"
                                    type="text"
                                    autoComplete="text"
                                    required
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    placeholder="Matric No / Application No"
                                />
                            </div>
                        </div>

                        <div className="flex items-center ">
                            <div className="flex items-center">
                                {/* <input
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                /> */}
                                {/* <label
                                    htmlFor="remember-me"
                                    className="m-1 block text-sm text-gray-900 font-bold"
                                >
                                    Note: Default password is your surname in lowercase 
                                </label> */}
                            </div>

                            <div className="text-sm">
                                <a
                                    href="/login"
                                    className="m-1 block text-sm text-gray-900 font-bold hover:text-indigo-500"
                                >
                                    Login
                                </a>
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                    <LockClosedIcon
                                        className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                                        aria-hidden="true"
                                    />
                                </span>
                               RESET
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
            
        );
    }
}