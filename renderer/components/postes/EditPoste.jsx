"use client";

import InputMulti from "../utils/InputMulti";
import ReactFlagsSelect from "react-flags-select";
import PhoneInput from "react-phone-input-2";
import Select from "react-select";
import qs from "query-string";
import Link from "next/link";

import { motion } from "framer-motion";
import { useContext, useEffect, useState } from "react";
import { isEmpty, isValidPhoneNumber } from "../../lib/allFunctions";
import { PiStudent } from "react-icons/pi";
import { City, State } from "country-state-city";
import { useDispatch, useSelector } from "react-redux";
import { BiEqualizer, BiTask } from "react-icons/bi";
import { LuListEnd } from "react-icons/lu";
import {
  BsGlobeAmericas,
  BsPersonWorkspace,
  BsTelephone,
} from "react-icons/bs";
import { GiBookmark } from "react-icons/gi";
import { FaArrowLeft, FaRegAddressBook } from "react-icons/fa";
import { MdOutlineVilla } from "react-icons/md";
import { GoLocation, GoTrash } from "react-icons/go";
import { GrUserExpert } from "react-icons/gr";
import { getName, getCode } from "country-list";

import {
  editPosteController,
  removePosteController,
} from "../../controllers/posteController";
import {
  deletePosteInfos,
  updatePosteInfos,
} from "../../redux/slices/postesSlice";
import { useRouter } from "next/navigation";
import { UidContext } from "../../context/UidContext";

const links = [
  {
    label: "Informations generales",
    path: "inf-generale",
  },
  {
    label: "Informations techniques",
    path: "inf-technique",
  },
];

export default function EditPoste({ poste }) {
  const { user } = useSelector((state) => state.user);
  const { path, currentQuery } = useContext(UidContext);
  const { push } = useRouter();

  const dispatch = useDispatch();

  const [isDelete, setIsDelete] = useState(false);
  const [active, setActive] = useState(links[0].path);
  const [telephone, setTelephone] = useState({
    value: poste?.telephone || "",
    valid: !isEmpty(poste?.telephone),
  });
  const [paysCode, setPaysCode] = useState({
    value: !isEmpty(poste?.pays) ? getCode(poste.pays) : "",
    valid: !isEmpty(poste?.pays),
  });
  const [paysName, setPaysName] = useState({
    value: poste?.pays || "",
    valid: !isEmpty(poste?.pays),
  });
  const [regionName, setRegionName] = useState({
    value: poste?.region || "",
    valid: !isEmpty(poste?.region),
  });
  const [description, setDescription] = useState({
    value: poste?.description || "",
    valid: !isEmpty(poste?.description),
  });
  const [ville, setVille] = useState({
    value: poste?.ville || "",
    valid: !isEmpty(poste?.ville),
  });
  const [actualMission, setActualMission] = useState({
    value: "",
    valid: false,
  });
  const [missions, setMissions] = useState({
    value: poste?.missions || [],
    valid: !isEmpty(poste?.missions),
  });
  const [actualCompetence, setActualCompetence] = useState({
    value: "",
    valid: false,
  });
  const [competences, setCompetences] = useState({
    value: poste?.competences || [],
    valid: !isEmpty(poste?.competences),
  });
  const [actualExperience, setActualExperience] = useState({
    value: "",
    valid: false,
  });
  const [experiences, setExperiences] = useState({
    value: poste?.experiences || [],
    valid: !isEmpty(poste?.experiences),
  });
  const [actualDiplome, setActualDiplome] = useState({
    value: "",
    valid: false,
  });
  const [diplomes, setDiplomes] = useState({
    value: poste?.diplomes || [],
    valid: !isEmpty(poste?.diplomes),
  });
  const [actualQualite, setActualQualite] = useState({
    value: "",
    valid: false,
  });
  const [qualites, setQualites] = useState({
    value: poste?.qualites || [],
    valid: !isEmpty(poste?.qualites),
  });
  const [actualFormation, setActualFormation] = useState({
    value: "",
    valid: false,
  });
  const [formations, setFormations] = useState({
    value: poste?.formations || [],
    valid: !isEmpty(poste?.formations),
  });
  const [actualLangue, setActualLangue] = useState({ value: "", valid: false });
  const [langues, setLangues] = useState({
    value: poste?.langues || [],
    valid: !isEmpty(poste?.langues),
  });

  const [canSubmit, setCanSubmit] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const states = !isEmpty(paysCode.value)
    ? State.getStatesOfCountry(paysCode.value).map((state) => ({
        value: state.isoCode,
        label: state.name,
      }))
    : [];

  const [regionCode, setRegionCode] = useState({
    value: !isEmpty(poste.region)
      ? states.find((item) => item.label === poste.region)?.value
      : "",
    valid: false,
  });

  const cities = !isEmpty(regionCode.value)
    ? City.getCitiesOfState(paysCode.value, regionCode.value).map((city) => ({
        value: city.name,
        label: city.name,
      }))
    : [];

  useEffect(() => {
    // telephone
    if (
      isValidPhoneNumber(telephone.value) &&
      telephone.value !== poste.telephone
    ) {
      setTelephone((prev) => ({ ...prev, valid: true }));
      if (!canSubmit) {
        setCanSubmit(true);
      }
    } else {
      setTelephone((prev) => ({ ...prev, valid: false }));
    }

    // paysCode
    if (
      paysCode.value?.trim().length > 1 &&
      paysCode.value !== getCode(poste.pays)
    ) {
      setPaysCode((prev) => ({ ...prev, valid: true }));
      setPaysName((prev) => ({
        ...prev,
        valid: true,
        value: getName(paysCode.value),
      }));

      if (!canSubmit) {
        setCanSubmit(true);
      }
    } else {
      setPaysCode((prev) => ({ ...prev, valid: false }));
      setPaysName((prev) => ({
        ...prev,
        valid: false,
        value: "",
      }));
    }

    // region code
    if (
      !isEmpty(regionCode.value) &&
      regionCode.value !==
        states.find((item) => item.label === poste.region)?.value
    ) {
      setRegionCode((prev) => ({ ...prev, valid: true }));
      setRegionName((prev) => ({
        ...prev,
        valid: true,
        value: states.find((item) => item.value === regionCode.value)?.label,
      }));

      if (!canSubmit) {
        setCanSubmit(true);
      }
    } else {
      setRegionCode((prev) => ({ ...prev, valid: false }));
      setRegionName((prev) => ({ ...prev, valid: false, value: "" }));
    }

    // // ville
    // if (!isEmpty(ville.value)) {
    //   setVille((prev) => ({ ...prev, valid: true }));
    // } else {
    //   setVille((prev) => ({ ...prev, valid: false }));
    // }

    // description
    if (
      description.value?.trim()?.length > 5 &&
      description.value?.trim() !== poste.description
    ) {
      setDescription((prev) => ({ ...prev, valid: true }));
      if (!canSubmit) {
        setCanSubmit(true);
      }
    } else {
      setDescription((prev) => ({ ...prev, valid: false }));
    }
  }, [
    telephone.value,
    paysCode.value,
    regionCode.value,
    ville.value,
    description.value,
  ]);

  useEffect(() => {
    // actual mission
    if (actualMission.value?.trim()?.length > 1) {
      setActualMission((prev) => ({ ...prev, valid: true }));
    } else {
      setActualMission((prev) => ({ ...prev, valid: false }));
    }

    // actual competence
    if (actualCompetence.value?.trim()?.length > 1) {
      setActualCompetence((prev) => ({ ...prev, valid: true }));
    } else {
      setActualCompetence((prev) => ({ ...prev, valid: false }));
    }

    // actual experience
    if (actualExperience.value?.trim()?.length > 1) {
      setActualExperience((prev) => ({ ...prev, valid: true }));
    } else {
      setActualExperience((prev) => ({ ...prev, valid: false }));
    }

    // actual diplome
    if (actualDiplome.value?.trim()?.length > 1) {
      setActualDiplome((prev) => ({ ...prev, valid: true }));
    } else {
      setActualDiplome((prev) => ({ ...prev, valid: false }));
    }

    // actual qualite
    if (actualQualite.value?.trim()?.length > 1) {
      setActualQualite((prev) => ({ ...prev, valid: true }));
    } else {
      setActualQualite((prev) => ({ ...prev, valid: false }));
    }

    // actual formation
    if (actualFormation.value?.trim()?.length > 1) {
      setActualFormation((prev) => ({ ...prev, valid: true }));
    } else {
      setActualFormation((prev) => ({ ...prev, valid: false }));
    }

    // actual langue
    if (actualLangue.value?.trim()?.length > 1) {
      setActualLangue((prev) => ({ ...prev, valid: true }));
    } else {
      setActualLangue((prev) => ({ ...prev, valid: false }));
    }
  }, [
    actualMission.value,
    actualCompetence.value,
    actualExperience.value,
    actualFormation.value,
    actualDiplome.value,
    actualQualite.value,
    actualLangue.value,
  ]);

  const handleAdd = (actual) => {
    if (!canSubmit) {
      setCanSubmit(true);
    }

    if (actualMission.valid && actual === "mission") {
      setMissions((prev) => {
        let newState = { ...prev };
        newState.valid = true;
        newState.value = [...newState.value, actualMission.value];
        return newState;
      });
      setActualMission({ valid: false, value: "" });
    } else if (actualCompetence.valid && actual === "competence") {
      setCompetences((prev) => {
        let newState = { ...prev };
        newState.valid = true;
        newState.value = [...newState.value, actualCompetence.value];
        return newState;
      });
      setActualCompetence({ valid: false, value: "" });
    } else if (actualExperience.valid && actual === "experience") {
      setExperiences((prev) => {
        let newState = { ...prev };
        newState.valid = true;
        newState.value = [...newState.value, actualExperience.value];
        return newState;
      });
      setActualExperience({ valid: false, value: "" });
    } else if (actualDiplome.valid && actual === "diplome") {
      setDiplomes((prev) => {
        let newState = { ...prev };
        newState.valid = true;
        newState.value = [...newState.value, actualDiplome.value];
        return newState;
      });
      setActualDiplome({ valid: false, value: "" });
    } else if (actualQualite.valid && actual === "qualite") {
      setQualites((prev) => {
        let newState = { ...prev };
        newState.valid = true;
        newState.value = [...newState.value, actualQualite.value];
        return newState;
      });
      setActualQualite({ valid: false, value: "" });
    } else if (actualFormation.valid && actual === "formation") {
      setFormations((prev) => {
        let newState = { ...prev };
        newState.valid = true;
        newState.value = [...newState.value, actualFormation.value];
        return newState;
      });
      setActualFormation({ valid: false, value: "" });
    } else if (actualLangue.valid && actual === "langue") {
      setLangues((prev) => {
        let newState = { ...prev };
        newState.valid = true;
        newState.value = [...newState.value, actualLangue.value];
        return newState;
      });
      setActualLangue({ valid: false, value: "" });
    }
  };

  const handleDelete = (actual, index) => {
    if (!canSubmit) {
      setCanSubmit(true);
    }

    if (actual === "mission") {
      setMissions((prev) => {
        let newState = { ...prev };
        newState.valid = true;
        newState.value = [
          ...newState.value.slice(0, index),
          ...newState.value.slice(index + 1),
        ];
        return newState;
      });
    } else if (actual === "competence") {
      setCompetences((prev) => {
        let newState = { ...prev };
        newState.valid = true;
        newState.value = [
          ...newState.value.slice(0, index),
          ...newState.value.slice(index + 1),
        ];
        return newState;
      });
    } else if (actual === "experience") {
      setExperiences((prev) => {
        let newState = { ...prev };
        newState.valid = true;
        newState.value = [
          ...newState.value.slice(0, index),
          ...newState.value.slice(index + 1),
        ];
        return newState;
      });
    } else if (actual === "diplome") {
      setDiplomes((prev) => {
        let newState = { ...prev };
        newState.valid = true;
        newState.value = [
          ...newState.value.slice(0, index),
          ...newState.value.slice(index + 1),
        ];
        return newState;
      });
    } else if (actual === "formation") {
      setFormations((prev) => {
        let newState = { ...prev };
        newState.valid = true;
        newState.value = [
          ...newState.value.slice(0, index),
          ...newState.value.slice(index + 1),
        ];
        return newState;
      });
    } else if (actual === "qualite") {
      setQualites((prev) => {
        let newState = { ...prev };
        newState.valid = true;
        newState.value = [
          ...newState.value.slice(0, index),
          ...newState.value.slice(index + 1),
        ];
        return newState;
      });
    } else if (actual === "langue") {
      setLangues((prev) => {
        let newState = { ...prev };
        newState.valid = true;
        newState.value = [
          ...newState.value.slice(0, index),
          ...newState.value.slice(index + 1),
        ];
        return newState;
      });
    }
  };

  const handleEnter = (e, actual) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAdd(actual);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmit(true);

    if (!isEmpty(missions.value)) {
      setIsLoading(true);
      const res = await editPosteController({
        id: user.id,
        posteId: poste.id,
        telephone: telephone.valid ? telephone.value.trim() : null,
        pays: paysName.valid ? paysName.value.trim() : null,
        region: regionName.valid ? regionName.value.trim() : null,
        ville: ville.valid ? ville.value.trim() : null,
        description: description.valid ? description.value.trim() : null,
        missions: missions.value,
        langues: langues.valid ? langues.value : null,
        competences: competences.valid ? competences.value : null,
        experiences: experiences.valid ? experiences.value : null,
        diplomes: diplomes.valid ? diplomes.value : null,
        formations: formations.valid ? formations.value : null,
        qualites: qualites.valid ? qualites.value : null,
      });
      setIsLoading(false);

      if (res?.poste) {
        dispatch(updatePosteInfos({ poste: res.poste }));
        const url = qs.stringifyUrl(
          { url: path, query: { path: "postes" } },
          { skipNull: true }
        );
        push(url);
      }
    }
  };

  const handleRemove = async () => {
    const res = await removePosteController({ id: user.id, posteId: poste.id });

    if (res?.poste) {
      dispatch(deletePosteInfos({ poste: res.poste }));
      const url = qs.stringifyUrl(
        { url: path, query: { path: "postes" } },
        { skipNull: true }
      );
      push(url);
    }
  };

  return (
    <>
      <div className="flex flex-col gap-8">
        <div className="relative flex justify-between items-center">
          <Link
            href={{
              pathname: path,
              query: {
                path: currentQuery.path,
                poste: currentQuery.poste,
                view: currentQuery.poste,
              },
            }}
            className="w-24"
          >
            <i className="text-[var(--primary-color)] cursor-pointer opacity-80 hover:opacity-100 transition-opacity duration-100">
              <FaArrowLeft size={"1.5rem"} />
            </i>
          </Link>
          <h1 className="relative w-max flex items-center justify-center text-4xl uppercase text-center font-semibold text-[var(--primary-color)] py-4">
            {poste.titre}
            <span className="absolute h-1 w-10 bg-[var(--primary-color)] rounded-full bottom-0"></span>
          </h1>

          <div className="w-24 flex justify-end items-center">
            <button
              onClick={() => setIsDelete(true)}
              className="flex justify-center items-center text-white bg-[var(--primary-color)] h-10 w-10 rounded-md"
            >
              <GoTrash size={"1.2rem"} />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex gap-8 flex-col">
          <div className="flex justify-between gap-10">
            {links.map((item) => (
              <label
                key={item.path}
                onClick={() => setActive(item.path)}
                className={`flex items-center justify-center whitespace-nowrap w-1/2 h-10 uppercase rounded-sm border border-[var(--primary-color)] cursor-pointer ${
                  active === item.path
                    ? "bg-[var(--primary-color)] text-white"
                    : "text-[var(--primary-color)]"
                }`}
              >
                {item.label}
              </label>
            ))}
          </div>

          {active === links[0].path && (
            <div className="w-full grid grid-cols-4 flex-1 gap-x-10 gap-y-4">
              {/* pays */}
              <div className="flex flex-col gap-2 justify-between">
                <label
                  htmlFor="pays"
                  className="font-semibold flex gap-2 items-center text-[var(--cont)]"
                >
                  <i>
                    <BsGlobeAmericas size={"1rem"} />
                  </i>
                  Pays
                </label>
                <ReactFlagsSelect
                  selected={paysCode.value}
                  onSelect={(p) => {
                    setPaysCode((prev) => ({ ...prev, value: p }));
                  }}
                  placeholder={"Pays"}
                  searchPlaceholder="Rechercher..."
                  searchable
                />
              </div>

              {/* region */}
              <div className="flex flex-col gap-2 justify-between">
                <label
                  htmlFor="region"
                  className="font-semibold flex gap-2 items-center text-[var(--cont)]"
                >
                  <i>
                    <GoLocation size={"1.15rem"} />
                  </i>
                  Region
                </label>
                {!isEmpty(paysCode.value) ? (
                  <Select
                    options={states}
                    value={states.find(
                      (item) => item.value === regionCode.value
                    )}
                    onChange={(e) =>
                      setRegionCode((prev) => ({
                        ...prev,
                        value: e.value,
                      }))
                    }
                    placeholder="Region"
                  />
                ) : (
                  <input
                    id="region"
                    placeholder="Region"
                    className="flex items-center bg-slate-200 h-10 px-4 rounded-sm focus:outline-slate-300 focus:outline-offset-2"
                  />
                )}
              </div>

              {/* Description */}
              <div className="flex flex-col gap-2 row-span-2 col-span-2">
                <label
                  htmlFor="description"
                  className="font-semibold flex items-center gap-2 text-[var(--cont)]"
                >
                  <i>
                    <LuListEnd size={"1.25rem"} />
                  </i>
                  <span>Description du poste</span>
                </label>
                <textarea
                  rows={5}
                  type="text"
                  id="description"
                  placeholder="Description ici"
                  value={description.value}
                  onChange={(e) =>
                    setDescription((prev) => ({
                      ...prev,
                      value: e.target.value,
                    }))
                  }
                  className="bg-[var(--bg)] py-2 px-4 focus:outline-1 focus:outline-slate-300 outline-offset-2 text-[var(--cont)]"
                />
              </div>

              {/* telephone */}
              <div className="gap-2 flex flex-col justify-between">
                <label
                  htmlFor="telephone"
                  className="font-semibold flex gap-2 items-center text-[var(--cont)]"
                >
                  <i>
                    <BsTelephone size={"1rem"} />
                  </i>
                  Contact
                </label>
                <PhoneInput
                  id="telephone"
                  country={"mg"}
                  value={telephone.value}
                  onChange={(e) =>
                    setTelephone((prev) => ({ ...prev, value: e }))
                  }
                  inputProps={{ required: true }}
                  className="flex items-center h-10 px-4 rounded-sm"
                />
              </div>

              {/* ville */}
              <div className="flex flex-col gap-2 justify-between">
                <label
                  htmlFor="region"
                  className="font-semibold flex gap-2 items-center text-[var(--cont)]"
                >
                  <i>
                    <MdOutlineVilla size={"1.25rem"} />
                  </i>
                  Ville
                </label>
                {!isEmpty(regionCode.value) ? (
                  <Select
                    options={cities}
                    value={cities.find((item) => item.label === ville.value)}
                    onChange={(e) =>
                      setVille((prev) => ({ ...prev, value: e.label }))
                    }
                    placeholder="Ville"
                  />
                ) : (
                  <input
                    id="region"
                    placeholder="Ville"
                    className="flex items-center bg-slate-200 h-10 px-4 rounded-sm focus:outline-slate-300 focus:outline-offset-2"
                  />
                )}
              </div>

              <div></div>
              <div></div>

              {/* Responsabilites */}
              <div className="col-span-2">
                <InputMulti
                  id={"mission"}
                  label={"Missions et Responsabilites"}
                  placeholder={"Realisation de ..."}
                  array={missions.value}
                  value={actualMission.value}
                  onChange={(e) =>
                    setActualMission((prev) => ({
                      ...prev,
                      value: e.target.value,
                    }))
                  }
                  onAdd={() => handleAdd("mission")}
                  onEnter={(e) => handleEnter(e, "mission")}
                  onDelete={(index) => handleDelete("mission", index)}
                  icon={<BiTask size={"1.25rem"} />}
                />
              </div>
            </div>
          )}

          {active === links[1].path && (
            <div className="w-full grid grid-cols-2 flex-1 gap-x-10 gap-y-4">
              {/* Competences techniques */}
              <InputMulti
                id={"competence"}
                label={"Competences requises"}
                placeholder={"Competence"}
                array={competences.value}
                value={actualCompetence.value}
                onChange={(e) =>
                  setActualCompetence((prev) => ({
                    ...prev,
                    value: e.target.value,
                  }))
                }
                onAdd={() => handleAdd("competence")}
                onEnter={(e) => handleEnter(e, "competence")}
                onDelete={(index) => handleDelete("competence", index)}
                icon={<BsPersonWorkspace size={"1.25rem"} />}
              />

              {/* Competences linguistiques */}
              <InputMulti
                id={"langue"}
                label={"Competences linguistiques"}
                placeholder={"Anglais"}
                array={langues.value}
                value={actualLangue.value}
                onChange={(e) =>
                  setActualLangue((prev) => ({
                    ...prev,
                    value: e.target.value,
                  }))
                }
                onAdd={() => handleAdd("langue")}
                onEnter={(e) => handleEnter(e, "langue")}
                onDelete={(index) => handleDelete("langue", index)}
                icon={<GiBookmark size={"1.25rem"} />}
              />

              {/* Experiences requises */}
              <InputMulti
                id={"experience"}
                label={"Experiences requises"}
                placeholder={"Experience"}
                array={experiences.value}
                value={actualExperience.value}
                onChange={(e) =>
                  setActualExperience((prev) => ({
                    ...prev,
                    value: e.target.value,
                  }))
                }
                onAdd={() => handleAdd("experience")}
                onEnter={(e) => handleEnter(e, "experience")}
                onDelete={(index) => handleDelete("experience", index)}
                icon={<FaRegAddressBook size={"1.25rem"} />}
              />

              {/* Diplomes requis */}
              <InputMulti
                id={"diplome"}
                label={"Diplomes requis"}
                placeholder={"Diplome"}
                array={diplomes.value}
                value={actualDiplome.value}
                onChange={(e) =>
                  setActualDiplome((prev) => ({
                    ...prev,
                    value: e.target.value,
                  }))
                }
                onAdd={() => handleAdd("diplome")}
                onEnter={(e) => handleEnter(e, "diplome")}
                onDelete={(index) => handleDelete("diplome", index)}
                icon={<PiStudent size={"1.25rem"} />}
              />

              {/* Formations requises */}
              <InputMulti
                id={"formation"}
                label={"Formations requises"}
                placeholder={"Formation"}
                array={formations.value}
                value={actualFormation.value}
                onChange={(e) =>
                  setActualFormation((prev) => ({
                    ...prev,
                    value: e.target.value,
                  }))
                }
                onAdd={() => handleAdd("formation")}
                onEnter={(e) => handleEnter(e, "formation")}
                onDelete={(index) => handleDelete("formation", index)}
                icon={<GrUserExpert size={"1.25rem"} />}
              />

              {/* Qualites requises */}
              <InputMulti
                id={"qualite"}
                label={"Qualites requises"}
                placeholder={"Qualite"}
                array={qualites.value}
                value={actualQualite.value}
                onChange={(e) =>
                  setActualQualite((prev) => ({
                    ...prev,
                    value: e.target.value,
                  }))
                }
                onAdd={() => handleAdd("qualite")}
                onEnter={(e) => handleEnter(e, "qualite")}
                onDelete={(index) => handleDelete("qualite", index)}
                icon={<BiEqualizer size={"1.5rem"} />}
              />
            </div>
          )}

          {/* buttons */}
          <div className="w-full flex justify-end">
            <div className="flex gap-10 w-1/2 pl-6">
              <Link
                href={{
                  pathname: path,
                  query: {
                    path: currentQuery.path,
                    poste: currentQuery.poste,
                    view: currentQuery.poste,
                  },
                }}
                className="flex justify-center items-center text-red-500 border border-red-500 hover:bg-[var(--bg-red-5)] h-10 rounded-sm w-full"
              >
                <span>Annuler</span>
              </Link>
              <button
                type="submit"
                disabled={isEmpty(missions.value)}
                className={`bg-green-500 text-white h-10 rounded-sm w-full ${
                  !isEmpty(missions.value)
                    ? "opacity-100 cursor-pointer"
                    : "opacity-50"
                }`}
              >
                <span>Mettre a jour</span>
              </button>
            </div>
          </div>
        </form>

        {isDelete && (
          <div className="fixed top-0 left-0 h-full w-full flex justify-center items-center bg-slate-900 bg-opacity-25">
            <motion.div
              initial={{ y: -15 }}
              animate={{ y: 0 }}
              className="p-6 rounded-md bg-[var(--bg-1)] flex justify-center items-center flex-col gap-4 w-80 transition-all duration-100 ease-linear border border-[var(--cont)]"
            >
              <h1 className="uppercase text-center text-[var(--cont)]">
                Supprimer le poste ?
              </h1>
              <div className="flex gap-4">
                <button
                  onClick={() => setIsDelete(false)}
                  className="uppercase w-20 h-8 rounded-sm text-red-500 border border-red-500 hover:bg-[var(--bg-red-5)]"
                >
                  Non
                </button>
                <button
                  onClick={handleRemove}
                  className="uppercase w-20 h-8 bg-green-500 rounded-sm text-[var(--white)]"
                >
                  Oui
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </>
  );
}
