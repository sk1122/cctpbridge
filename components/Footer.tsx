import React, { useState } from "react";
import { Input } from "./input";
import {
  ChevronRight,
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  Youtube,
} from "lucide-react";
import Feedback from "./Feedback";
import { toast } from "react-toastify";

const Info = [
  {
    name: "About us",
    link: "https://fetcch.xyz",
  },
  {
    name: "Integrate",
    link: "https://docs.fetcch.xyz",
  },
  {
    name: "Report",
    link: "https://fetcch.xyz/report-with-anq",
  },
];

const About = [
  {
    name: "Gallery",
    link: "",
  },
  {
    name: "Technologies",
    link: "",
  },
  {
    name: "Contacts",
    link: "",
  },
];

const Contact = [
  // {
  //   name: "+1 (999) 999-99-99",
  //   link: "",
  // },
  {
    name: "hello@fetcch.xyz",
    link: "mailto:hello@fetcch.xyz",
  },
  // {
  //   name: "London",
  //   link: "",
  // },
];

const Socials = [
  // {
  //   icon: <Facebook />,
  //   link: "",
  // },
  // {
  //   icon: <Instagram />,
  //   link: "",
  // },
  // {
  //   icon: <Youtube />,
  //   link: "",
  // },
  {
    icon: <Linkedin />,
    link: "https://www.linkedin.com/company/fetcchx/",
  },
  {
    icon: <Twitter />,
    link: "https://twitter.com/FetcchX",
  },
];

export default function Footer() {
  const [email, setEmail] = useState("")
  const add = async () => {
    try {
        const res = await fetch(
          "https://wallet-api.fetcch.xyz/add-email-for-website",
          {
            method: "POST",
            body: JSON.stringify({
              email: email,
            }),
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          },
        )
    
        toast.success("Successfully Subscribed")
    } catch (e) {
      toast.error("Can't subscribe now, try again")
    }
  }
 
  return (
    <div className="relative py-32">
      <div className="container mx-auto flex items-start justify-between px-4 flex-wrap">
        <section className="w-full lg:w-2/4">
          <div className="flex justify-between items-start flex-wrap gap-10">
            <img src="/logo.svg" alt="" />
            <div className="flex gap-10">
              <div>
                <h2 className="mb-6 text-sm font-semibold uppercase text-[#FF7D1F]">
                  Info
                </h2>
                <ul className="font-medium">
                  {Info.map((data, index) => (
                    <li className="mb-2" key={index}>
                      <a href={data.link} className=" hover:underline">
                        {data.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              {/* <div>
                <h2 className="mb-6 text-sm font-semibold uppercase text-[#FF7D1F]">
                  About us
                </h2>
                <ul className="font-medium">
                  {About.map((data, index) => (
                    <li className="mb-2" key={index}>
                      <a href="#" className=" hover:underline">
                        {data.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div> */}
            </div>
          </div>
          <div>
            <h2 className="mb-6 text-sm font-semibold uppercase text-[#FF7D1F]">
              Contact us
            </h2>
            <ul className="font-medium">
              {Contact.map((data, index) => (
                <li className="mb-2" key={index}>
                  <a
                    href={data.link}
                    className="hover:underline"
                    target="_blank"
                  >
                    {data.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-10 mb-20">
            <h2 className="mb-6 text-sm font-semibold uppercase text-[#FF7D1F]">
              Subscription
            </h2>
            <div className="border border-white rounded-lg flex items-center">
              <Input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                className={"text-sm font-medium bg-transparent"}
                placeholder="E-mail"
              />
              <div className="w-0.5 bg-slate-300 h-6"></div>
              <ChevronRight onClick={() => add()} className="mx-2 text-[#FF7D1F]" />
            </div>
          </div>
          <div className="flex justify-between items-end mb-8 flex-wrap gap-10">
            <div className="flex gap-4 items-center">
              {Socials.map((social, index) => (
                <a href={social.link} target="_blank">
                  <div
                    className="p-3 border border-white rounded-full"
                    key={index}
                  >
                    {social.icon}
                  </div>
                </a>
              ))}
            </div>
            <p className="text-sm text-gray-400">© 2023 — Copyright Fetcch</p>
          </div>
        </section>
        <Feedback />
      </div>
      <img
        src="/footer.svg"
        alt=""
        className="absolute bottom-0 -z-10 object-bottom"
      />
    </div>
  );
}
