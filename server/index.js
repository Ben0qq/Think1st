import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@react-router/node";
import { ServerRouter, useMatches, useActionData, useLoaderData, useParams, useRouteError, Meta, Links, ScrollRestoration, Scripts, Outlet, isRouteErrorResponse } from "react-router";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { createElement, useState, useEffect, useMemo } from "react";
import { ReactSVG } from "react-svg";
import classNames from "classnames";
const streamTimeout = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, routerContext, loadContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    let userAgent = request.headers.get("user-agent");
    let readyOption = userAgent && isbot(userAgent) || routerContext.isSpaMode ? "onAllReady" : "onShellReady";
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(ServerRouter, { context: routerContext, url: request.url }),
      {
        [readyOption]() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, streamTimeout + 1e3);
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest,
  streamTimeout
}, Symbol.toStringTag, { value: "Module" }));
function withComponentProps(Component) {
  return function Wrapped() {
    const props = {
      params: useParams(),
      loaderData: useLoaderData(),
      actionData: useActionData(),
      matches: useMatches()
    };
    return createElement(Component, props);
  };
}
function withErrorBoundaryProps(ErrorBoundary3) {
  return function Wrapped() {
    const props = {
      params: useParams(),
      loaderData: useLoaderData(),
      actionData: useActionData(),
      error: useRouteError()
    };
    return createElement(ErrorBoundary3, props);
  };
}
const links = () => [{
  rel: "preconnect",
  href: "https://fonts.googleapis.com"
}, {
  rel: "preconnect",
  href: "https://fonts.gstatic.com",
  crossOrigin: "anonymous"
}, {
  rel: "stylesheet",
  href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
}];
function Layout({
  children
}) {
  return /* @__PURE__ */ jsxs("html", {
    lang: "en",
    children: [/* @__PURE__ */ jsxs("head", {
      children: [/* @__PURE__ */ jsx("meta", {
        charSet: "utf-8"
      }), /* @__PURE__ */ jsx("meta", {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      }), /* @__PURE__ */ jsx(Meta, {}), /* @__PURE__ */ jsx(Links, {})]
    }), /* @__PURE__ */ jsxs("body", {
      children: [children, /* @__PURE__ */ jsx(ScrollRestoration, {}), /* @__PURE__ */ jsx(Scripts, {})]
    })]
  });
}
const root = withComponentProps(function App() {
  return /* @__PURE__ */ jsx(Outlet, {});
});
const ErrorBoundary = withErrorBoundaryProps(function ErrorBoundary2({
  error
}) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack;
  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details = error.status === 404 ? "The requested page could not be found." : error.statusText || details;
  }
  return /* @__PURE__ */ jsxs("main", {
    className: "pt-16 p-4 container mx-auto",
    children: [/* @__PURE__ */ jsx("h1", {
      children: message
    }), /* @__PURE__ */ jsx("p", {
      children: details
    }), stack]
  });
});
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary,
  Layout,
  default: root,
  links
}, Symbol.toStringTag, { value: "Module" }));
const arrowLeft = "data:image/svg+xml,%3csvg%20width='11'%20height='14'%20viewBox='0%200%2011%2014'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M0.499999%207.86602C-0.166668%207.48112%20-0.166667%206.51888%200.5%206.13397L9.5%200.937821C10.1667%200.552921%2011%201.03405%2011%201.80385L11%2012.1962C11%2012.966%2010.1667%2013.4471%209.5%2013.0622L0.499999%207.86602Z'%20fill='%23CBB6E5'/%3e%3c/svg%3e";
const arrowRight = "data:image/svg+xml,%3csvg%20width='11'%20height='14'%20viewBox='0%200%2011%2014'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M10.5%207.86602C11.1667%207.48112%2011.1667%206.51888%2010.5%206.13397L1.5%200.937821C0.833334%200.552921%206.10471e-07%201.03405%205.76822e-07%201.80385L1.2256e-07%2012.1962C8.8911e-08%2012.966%200.833333%2013.4471%201.5%2013.0622L10.5%207.86602Z'%20fill='%23CBB6E5'/%3e%3c/svg%3e";
const info = "data:image/svg+xml,%3csvg%20width='16'%20height='16'%20viewBox='0%200%2016%2016'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M8%2016C6.41775%2016%204.87104%2015.5308%203.55544%2014.6518C2.23985%2013.7727%201.21447%2012.5233%200.608967%2011.0615C0.00346629%209.59966%20-0.15496%207.99113%200.153721%206.43928C0.462403%204.88743%201.22433%203.46197%202.34315%202.34315C3.46197%201.22433%204.88743%200.462401%206.43928%200.153719C7.99113%20-0.154963%209.59966%200.00346375%2011.0615%200.608965C12.5233%201.21447%2013.7727%202.23985%2014.6518%203.55544C15.5308%204.87103%2016%206.41775%2016%208C16%2010.1217%2015.1571%2012.1566%2013.6569%2013.6569C12.1566%2015.1571%2010.1217%2016%208%2016ZM7.00667%2012C7.00667%2012.2652%207.11203%2012.5196%207.29956%2012.7071C7.4871%2012.8946%207.74145%2013%208.00667%2013C8.27189%2013%208.52624%2012.8946%208.71378%2012.7071C8.90131%2012.5196%209.00667%2012.2652%209.00667%2012V7.40667C9.00667%207.27535%208.9808%207.14531%208.93055%207.02398C8.88029%206.90266%208.80664%206.79242%208.71378%206.69956C8.62092%206.6067%208.51068%206.53304%208.38935%206.48279C8.26803%206.43253%208.13799%206.40667%208.00667%206.40667C7.87535%206.40667%207.74531%206.43253%207.62399%206.48279C7.50266%206.53304%207.39242%206.6067%207.29956%206.69956C7.2067%206.79242%207.13305%206.90266%207.08279%207.02398C7.03254%207.14531%207.00667%207.27535%207.00667%207.40667V12ZM8%203C7.77321%203%207.55152%203.06725%207.36295%203.19325C7.17438%203.31925%207.02741%203.49833%206.94062%203.70786C6.85383%203.91738%206.83113%204.14794%206.87537%204.37037C6.91961%204.5928%207.02882%204.79712%207.18919%204.95748C7.34955%205.11785%207.55387%205.22706%207.7763%205.2713C7.99873%205.31555%208.22929%205.29284%208.43881%205.20605C8.64834%205.11926%208.82743%204.97229%208.95342%204.78372C9.07942%204.59515%209.14667%204.37346%209.14667%204.14667C9.14667%203.84255%209.02586%203.55089%208.81082%203.33585C8.59578%203.12081%208.30412%203%208%203Z'%20fill='%23CBB6E5'/%3e%3c/svg%3e";
const errorIcon = "data:image/svg+xml,%3csvg%20width='16'%20height='16'%20viewBox='0%200%2016%2016'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M8%200C6.41775%200%204.87104%200.469192%203.55544%201.34824C2.23985%202.22729%201.21447%203.47672%200.608967%204.93853C0.00346629%206.40034%20-0.15496%208.00887%200.153721%209.56072C0.462403%2011.1126%201.22433%2012.538%202.34315%2013.6569C3.46197%2014.7757%204.88743%2015.5376%206.43928%2015.8463C7.99113%2016.155%209.59966%2015.9965%2011.0615%2015.391C12.5233%2014.7855%2013.7727%2013.7602%2014.6518%2012.4446C15.5308%2011.129%2016%209.58225%2016%208C16%205.87827%2015.1571%203.84344%2013.6569%202.34315C12.1566%200.842855%2010.1217%200%208%200ZM7.00667%204C7.00667%203.73478%207.11203%203.48043%207.29956%203.29289C7.4871%203.10536%207.74145%203%208.00667%203C8.27189%203%208.52624%203.10536%208.71378%203.29289C8.90131%203.48043%209.00667%203.73478%209.00667%204V8.59333C9.00667%208.72465%208.9808%208.85469%208.93055%208.97602C8.88029%209.09734%208.80664%209.20758%208.71378%209.30044C8.62092%209.3933%208.51068%209.46696%208.38935%209.51721C8.26803%209.56747%208.13799%209.59333%208.00667%209.59333C7.87535%209.59333%207.74531%209.56747%207.62399%209.51721C7.50266%209.46696%207.39242%209.3933%207.29956%209.30044C7.2067%209.20758%207.13305%209.09734%207.08279%208.97602C7.03254%208.85469%207.00667%208.72465%207.00667%208.59333V4ZM8%2013C7.77321%2013%207.55152%2012.9327%207.36295%2012.8068C7.17438%2012.6808%207.02741%2012.5017%206.94062%2012.2921C6.85383%2012.0826%206.83113%2011.8521%206.87537%2011.6296C6.91961%2011.4072%207.02882%2011.2029%207.18919%2011.0425C7.34955%2010.8822%207.55387%2010.7729%207.7763%2010.7287C7.99873%2010.6845%208.22929%2010.7072%208.43881%2010.794C8.64834%2010.8807%208.82743%2011.0277%208.95342%2011.2163C9.07942%2011.4048%209.14667%2011.6265%209.14667%2011.8533C9.14667%2012.1574%209.02586%2012.4491%208.81082%2012.6641C8.59578%2012.8792%208.30412%2013%208%2013Z'%20fill='%23ED4545'/%3e%3c/svg%3e";
const Error = ({ error }) => {
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-row gap-1", children: [
    /* @__PURE__ */ jsx(ReactSVG, { src: errorIcon }),
    /* @__PURE__ */ jsx("p", { className: "text-sm", children: error })
  ] });
};
const Calendar = ({
  label,
  name,
  formData,
  setValue,
  errors
}) => {
  const today = /* @__PURE__ */ new Date();
  const [month, setMonth] = useState(today.getMonth());
  const [year, setYear] = useState(today.getFullYear());
  const [holidays, setHolidays] = useState([]);
  const [error, setError] = useState("");
  useEffect(() => {
    fetch("https://api.api-ninjas.com/v1/holidays?country=PL", {
      method: "GET",
      headers: new Headers({
        "X-Api-Key": "OH+HEf/9IH2zuHR/cMO/8g==ldhBovC6Rpa1TIss"
      })
    }).then((res) => res.json()).then((data) => {
      setHolidays(data);
    });
  }, []);
  const prevMonth = (e) => {
    e.preventDefault();
    setMonth((prev) => {
      if (prev === 0) setYear((prevYear) => prevYear - 1);
      return prev === 0 ? 11 : prev - 1;
    });
  };
  const nextMonth = (e) => {
    e.preventDefault();
    setMonth((prev) => {
      if (prev === 11) setYear((prevYear) => prevYear + 1);
      return prev === 11 ? 0 : prev + 1;
    });
  };
  const onDayClick = (e, day) => {
    e.preventDefault();
    setError("");
    const chosenDate = new Date(year, month, day);
    if (chosenDate.getDay() === 0) {
      setError("It is Sunday");
      setValue({
        ...formData,
        [name]: {
          day,
          month: month + 1,
          year,
          valid: false
        }
      });
      return;
    }
    const holiday = holidays.find(
      (el) => el.date === `${year}-${(month + 1).toString().padStart(2, "0")}-${day.toString().padStart(2, "0")}`
    );
    if (holiday && holiday.type === "NATIONAL_HOLIDAY") {
      setError(`It is ${holiday.name}`);
      setValue({
        ...formData,
        [name]: {
          day,
          month: month + 1,
          year,
          valid: false
        }
      });
      return;
    }
    setValue({
      ...formData,
      [name]: {
        day,
        month: month + 1,
        year,
        valid: true
      }
    });
  };
  const checkSelectedDate = (day) => {
    if (formData.day && day === formData.day.day && month + 1 === formData.day.month && year === formData.day.year)
      return true;
    return false;
  };
  const checkValidDate = (day) => {
    const chosenDate = new Date(year, month, day);
    const holiday = holidays.find(
      (el) => el.date === `${year}-${(month + 1).toString().padStart(2, "0")}-${day.toString().padStart(2, "0")}`
    );
    if (chosenDate.getDay() === 0 || holiday && holiday.type === "NATIONAL_HOLIDAY") {
      return false;
    }
    return true;
  };
  const weekdays = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();
  let daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  let emptyDays = new Array(firstDay === 0 ? 6 : firstDay - 1).fill(null);
  return /* @__PURE__ */ jsxs("label", { className: "text-base flex flex-col gap-y-2", children: [
    label,
    /* @__PURE__ */ jsxs("div", { className: "w-[342px] px-[32.5px] py-[42px] bg-white rounded-lg border border-[#CBB6E5]", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-4", children: [
        /* @__PURE__ */ jsx("button", { onClick: (e) => prevMonth(e), className: "p-2", children: /* @__PURE__ */ jsx(ReactSVG, { src: arrowLeft }) }),
        /* @__PURE__ */ jsxs("h2", { className: "font-medium", children: [
          new Date(year, month).toLocaleString("default", { month: "long" }),
          " ",
          year
        ] }),
        /* @__PURE__ */ jsx("button", { onClick: (e) => nextMonth(e), className: "p-2", children: /* @__PURE__ */ jsx(ReactSVG, { src: arrowRight }) })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-7 text-center font-medium", children: weekdays.map((day) => /* @__PURE__ */ jsx("div", { className: "py-2", children: day }, day)) }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-7 text-center", children: [
        emptyDays.map((_, index) => /* @__PURE__ */ jsx("div", { className: "py-2" }, index)),
        daysArray.map((day) => /* @__PURE__ */ jsx(
          "button",
          {
            onClick: (e) => {
              onDayClick(e, day);
            },
            className: classNames(
              "py-2 font-medium rounded-full hover:bg-gray-200",
              {
                "text-white bg-[#761BE4]": checkSelectedDate(day),
                "text-[#898DA9]": !checkValidDate(day)
              }
            ),
            children: day
          },
          day
        ))
      ] })
    ] }),
    error && /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
      /* @__PURE__ */ jsx(ReactSVG, { src: info }),
      /* @__PURE__ */ jsx("p", { className: "text-sm", children: error })
    ] }),
    errors[name] && /* @__PURE__ */ jsx(Error, { error: errors[name] })
  ] });
};
const deleteIcon = "data:image/svg+xml,%3csvg%20width='20'%20height='20'%20viewBox='0%200%2020%2020'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M10%200C15.523%200%2020%204.477%2020%2010C20%2015.523%2015.523%2020%2010%2020C4.477%2020%200%2015.523%200%2010C0%204.477%204.477%200%2010%200ZM7.879%206.464C7.69946%206.28275%207.45743%206.17697%207.20245%206.16832C6.94748%206.15967%206.69883%206.2488%206.50742%206.41747C6.31601%206.58613%206.1963%206.82159%206.1728%207.07562C6.14929%207.32966%206.22378%207.58308%206.381%207.784L6.465%207.879L8.585%209.999L6.465%2012.121C6.28375%2012.3005%206.17797%2012.5426%206.16932%2012.7975C6.16067%2013.0525%206.2498%2013.3012%206.41847%2013.4926C6.58713%2013.684%206.82258%2013.8037%207.07662%2013.8272C7.33066%2013.8507%207.58408%2013.7762%207.785%2013.619L7.879%2013.536L10%2011.414L12.121%2013.536C12.3005%2013.7173%2012.5426%2013.823%2012.7975%2013.8317C13.0525%2013.8403%2013.3012%2013.7512%2013.4926%2013.5825C13.684%2013.4139%2013.8037%2013.1784%2013.8272%2012.9244C13.8507%2012.6703%2013.7762%2012.4169%2013.619%2012.216L13.536%2012.121L11.414%2010L13.536%207.879C13.7173%207.69946%2013.823%207.45743%2013.8317%207.20245C13.8403%206.94748%2013.7512%206.69883%2013.5825%206.50742C13.4139%206.31601%2013.1784%206.1963%2012.9244%206.1728C12.6703%206.14929%2012.4169%206.22378%2012.216%206.381L12.121%206.464L10%208.586L7.879%206.464Z'%20fill='%23000853'/%3e%3c/svg%3e";
const hoveredIcon = "data:image/svg+xml,%3csvg%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M12%202C17.523%202%2022%206.477%2022%2012C22%2017.523%2017.523%2022%2012%2022C6.477%2022%202%2017.523%202%2012C2%206.477%206.477%202%2012%202ZM9.879%208.464C9.69946%208.28275%209.45743%208.17697%209.20245%208.16832C8.94748%208.15967%208.69883%208.2488%208.50742%208.41747C8.31601%208.58613%208.1963%208.82159%208.1728%209.07562C8.14929%209.32966%208.22378%209.58308%208.381%209.784L8.465%209.879L10.585%2011.999L8.465%2014.121C8.28375%2014.3005%208.17797%2014.5426%208.16932%2014.7975C8.16067%2015.0525%208.2498%2015.3012%208.41847%2015.4926C8.58713%2015.684%208.82258%2015.8037%209.07662%2015.8272C9.33066%2015.8507%209.58408%2015.7762%209.785%2015.619L9.879%2015.536L12%2013.414L14.121%2015.536C14.3005%2015.7173%2014.5426%2015.823%2014.7975%2015.8317C15.0525%2015.8403%2015.3012%2015.7512%2015.4926%2015.5825C15.684%2015.4139%2015.8037%2015.1784%2015.8272%2014.9244C15.8507%2014.6703%2015.7762%2014.4169%2015.619%2014.216L15.536%2014.121L13.414%2012L15.536%209.879C15.7173%209.69946%2015.823%209.45743%2015.8317%209.20245C15.8403%208.94748%2015.7512%208.69883%2015.5825%208.50742C15.4139%208.31601%2015.1784%208.1963%2014.9244%208.1728C14.6703%208.14929%2014.4169%208.22378%2014.216%208.381L14.121%208.464L12%2010.586L9.879%208.464Z'%20fill='%23ED4545'/%3e%3c/svg%3e";
const DeleteButton = ({ onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  return /* @__PURE__ */ jsx(
    "button",
    {
      onMouseEnter: () => setIsHovered(true),
      onMouseLeave: () => setIsHovered(false),
      onClick,
      children: /* @__PURE__ */ jsx("div", { className: "w-5 h-5 flex justify-center items-center", children: /* @__PURE__ */ jsx(ReactSVG, { src: isHovered ? hoveredIcon : deleteIcon }) })
    }
  );
};
const FileUploader = ({ label, name, formData, setValue, errors, ...props }) => {
  const onFileChange = (e) => {
    e.preventDefault();
    if (e.target.files) setValue({ ...formData, [name]: e.target.files[0] });
  };
  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFiles = e.dataTransfer;
    if ((droppedFiles == null ? void 0 : droppedFiles.files) && (droppedFiles == null ? void 0 : droppedFiles.files.length) > 0) {
      setValue({ ...formData, [name]: droppedFiles.files[0] });
    }
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("p", { className: "text-base flex flex-col gap-y-2", children: label }),
    /* @__PURE__ */ jsxs(
      "div",
      {
        className: "rounded-lg border border-[#CBB6E5] bg-white h-24 flex justify-center items-center",
        onDrop: handleDrop,
        draggable: true,
        onDragOver: (event) => event.preventDefault(),
        children: [
          formData[name] ? /* @__PURE__ */ jsxs("div", { className: "flex gap-x-2", children: [
            /* @__PURE__ */ jsx("p", { className: "font-medium", children: formData[name].name }),
            /* @__PURE__ */ jsx(
              DeleteButton,
              {
                onClick: () => {
                  setValue({ ...formData, [name]: null });
                }
              }
            )
          ] }) : /* @__PURE__ */ jsxs("div", { className: "flex gap-x-2", children: [
            /* @__PURE__ */ jsxs(
              "label",
              {
                htmlFor: "filePicker",
                className: "text-[#761BE4] underline underline-offset-4",
                children: [
                  "Upload a file",
                  " "
                ]
              }
            ),
            /* @__PURE__ */ jsx("p", { children: " or drag and drop here" })
          ] }),
          /* @__PURE__ */ jsx(
            "input",
            {
              ...props,
              id: "filePicker",
              className: "hidden",
              type: "file",
              accept: props.accept,
              onChange: onFileChange
            }
          )
        ]
      }
    ),
    errors[name] && /* @__PURE__ */ jsx(Error, { error: errors[name] })
  ] });
};
const Input = ({
  label,
  name,
  formData,
  setValue,
  errors,
  ...props
}) => {
  return /* @__PURE__ */ jsxs("label", { className: "text-base flex flex-col gap-y-2", children: [
    label,
    /* @__PURE__ */ jsx(
      "input",
      {
        ...props,
        onChange: (e) => {
          setValue({ ...formData, [name]: e.target.value });
        },
        className: classNames(
          " rounded-lg px-4 h-12 font-medium focus:border-2 focus:border-[#761BE4] focus:bg-[#FAF9FA] ",
          {
            "bg-white border border-[#CBB6E5]": !errors[name],
            "border-2 border-[#ED4545] bg-[#FEECEC]": errors[name]
          }
        )
      }
    ),
    errors[name] && /* @__PURE__ */ jsx(Error, { error: errors[name] })
  ] });
};
const Radio = ({
  label,
  name,
  values,
  formData,
  setValue
}) => {
  const onClick = (e, value) => {
    e.preventDefault();
    setValue({ ...formData, [name]: value });
  };
  return /* @__PURE__ */ jsxs("label", { className: "text-base flex flex-col gap-2", children: [
    label,
    /* @__PURE__ */ jsx("div", { className: "flex flex-row sm:flex-col gap-2", children: values.map((value) => /* @__PURE__ */ jsx(
      "button",
      {
        className: classNames("rounded-lg w-[76px] bg-white h-[46px]", {
          "border border-[#CBB6E5]": value !== formData[name],
          "border-2 border-[#761BE4]": value === formData[name]
        }),
        onClick: (e) => onClick(e, value),
        children: value
      }
    )) })
  ] });
};
const Slider = ({ label, name, formData, setValue, ...props }) => {
  const percentage = useMemo(() => {
    return (formData[name] - 8) / 92 * 100;
  }, [formData[name]]);
  return /* @__PURE__ */ jsxs("label", { className: "text-base flex flex-col gap-y-2 mb-12", children: [
    label,
    /* @__PURE__ */ jsxs("div", { className: "relative ", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-row justify-between mb-1 ", children: [
        /* @__PURE__ */ jsx("p", { className: "text-xs", children: "8" }),
        /* @__PURE__ */ jsx("p", { className: "text-xs", children: "100" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "relative mx-1", children: [
        /* @__PURE__ */ jsx(
          "div",
          {
            className: "absolute h-2 bg-[#761BE4] rounded-l-full",
            style: { width: `${percentage}%` }
          }
        ),
        /* @__PURE__ */ jsx(
          "div",
          {
            className: "absolute h-2 rounded-r-full bg-[#CBB6E5]",
            style: { left: `${percentage}%`, right: 0 }
          }
        ),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "range",
            min: 8,
            max: 100,
            step: 1,
            value: formData[name],
            onChange: (e) => {
              setValue({ ...formData, [name]: e.target.value });
            },
            className: "absolute w-full h-2 appearance-none bg-transparent cursor-pointer z-10 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-transparent [&::-webkit-slider-thumb]:rounded-full"
          }
        ),
        /* @__PURE__ */ jsx(
          "div",
          {
            className: "absolute w-4 h-4 bg-[#761BE4] rounded-full -top-1 pointer-events-none",
            style: {
              left: `calc(${percentage}% - 8px)`
            }
          }
        ),
        /* @__PURE__ */ jsx(
          "div",
          {
            className: "absolute flex justify-center items-center w-[37px] h-[31px] bg-[#FAF9FA] rounded-sm top-4 pointer-events-none border border-[#CBB6E5] ",
            style: {
              left: `calc(${percentage}% - 18px)`
            },
            children: formData[name]
          }
        )
      ] })
    ] })
  ] });
};
const deafultFormError = {
  firstName: "",
  lastName: "",
  email: "",
  age: "",
  photo: "",
  day: "",
  hour: ""
};
const Form = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    age: 8,
    photo: null,
    day: { valid: false },
    hour: ""
  });
  const [formError, setFormError] = useState(deafultFormError);
  const setData = (formData2) => {
    setFormError(deafultFormError);
    setFormData(formData2);
  };
  const sendApplication = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    };
    fetch("http://letsworkout.pl/submit", requestOptions);
  };
  const validate = () => {
    if (!formData.firstName)
      setFormError((prev) => ({
        ...prev,
        firstName: "This field is required"
      }));
    else if (!formData.lastName)
      setFormError((prev) => ({ ...prev, lastName: "This field is required" }));
    else if (!formData.email)
      setFormError((prev) => ({ ...prev, email: "This field is required" }));
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      setFormError((prev) => ({
        ...prev,
        email: `Please use correct formatting. Example: address@email.com`
      }));
    else if (!formData.photo)
      setFormError((prev) => ({ ...prev, photo: "This field is required" }));
    else if (!formData.day || !formData.hour)
      setFormError((prev) => ({ ...prev, day: "This fields are required" }));
    else sendApplication();
  };
  return /* @__PURE__ */ jsxs("form", { className: "gap-y-6 flex flex-col", children: [
    /* @__PURE__ */ jsx(
      Input,
      {
        label: "First Name",
        name: "firstName",
        formData,
        setValue: setData,
        errors: formError
      }
    ),
    /* @__PURE__ */ jsx(
      Input,
      {
        label: "Last Name",
        name: "lastName",
        formData,
        setValue: setData,
        errors: formError
      }
    ),
    /* @__PURE__ */ jsx(
      Input,
      {
        label: "Email Address",
        name: "email",
        formData,
        setValue: setData,
        errors: formError
      }
    ),
    /* @__PURE__ */ jsx(Slider, { label: "Age", name: "age", formData, setValue: setData }),
    /* @__PURE__ */ jsx(
      FileUploader,
      {
        label: "Photo",
        accept: "image/png, image/gif, image/jpeg",
        name: "photo",
        formData,
        setValue: setData,
        errors: formError
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row gap-4", children: [
      /* @__PURE__ */ jsx(
        Calendar,
        {
          label: "Date",
          name: "day",
          formData,
          setValue: setData,
          errors: formError
        }
      ),
      formData.day.valid === true && /* @__PURE__ */ jsx(
        Radio,
        {
          values: ["12:00", "14:00", "16:30", "18:30", "20:00"],
          label: "Time",
          name: "hour",
          formData,
          setValue: setData
        }
      )
    ] }),
    /* @__PURE__ */ jsx(
      "button",
      {
        onClick: (e) => {
          e.preventDefault();
          validate();
        },
        className: "text-white py-4 px-8 bg-[#761BE4] disabled:bg-[#CBB6E5] hover:bg-[#6A19CD]",
        children: "Send Application"
      }
    )
  ] });
};
const home = withComponentProps(function Home() {
  return /* @__PURE__ */ jsx("main", {
    className: "w-full h-full flex justify-center py-[96px]",
    children: /* @__PURE__ */ jsxs("div", {
      className: "w-[342px] sm:w-[434px] flex flex-col justify-start",
      children: [/* @__PURE__ */ jsx("p", {
        className: "text-2xl font-medium mb-8",
        children: "Personal info"
      }), /* @__PURE__ */ jsx(Form, {})]
    })
  });
});
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: home
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-BFhZpkrh.js", "imports": ["/assets/chunk-HA7DTUK3-DItZKCSJ.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": true, "module": "/assets/root-CgHNKptD.js", "imports": ["/assets/chunk-HA7DTUK3-DItZKCSJ.js", "/assets/with-props-Db1jVSdq.js"], "css": ["/assets/root-8Q1mq6z2.css"], "clientActionModule": void 0, "clientLoaderModule": void 0, "hydrateFallbackModule": void 0 }, "routes/home": { "id": "routes/home", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/home-DLMOZrfd.js", "imports": ["/assets/with-props-Db1jVSdq.js", "/assets/chunk-HA7DTUK3-DItZKCSJ.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "hydrateFallbackModule": void 0 } }, "url": "/assets/manifest-38ada5ad.js", "version": "38ada5ad" };
const assetsBuildDirectory = "build/client";
const basename = "/";
const future = { "unstable_optimizeDeps": false, "unstable_splitRouteModules": false, "unstable_viteEnvironmentApi": false };
const ssr = true;
const isSpaMode = false;
const prerender = [];
const publicPath = "/";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "routes/home": {
    id: "routes/home",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route1
  }
};
export {
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  prerender,
  publicPath,
  routes,
  ssr
};
