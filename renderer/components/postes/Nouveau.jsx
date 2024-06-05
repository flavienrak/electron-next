"use client";

import Top from "../Top";
import InputMulti from "../utils/InputMulti";
import ReactFlagsSelect from "react-flags-select";
import PhoneInput from "react-phone-input-2";
import Select from "react-select";
import qs from "query-string";

import { useContext, useEffect, useState } from "react";
import { isEmpty, isValidPhoneNumber } from "../../lib/allFunctions";
import { PiStudent } from "react-icons/pi";
import { City, State } from "country-state-city";
import { useDispatch, useSelector } from "react-redux";
import { BiEqualizer, BiTask } from "react-icons/bi";
import { LuListEnd } from "react-icons/lu";
import { AiOutlineNodeExpand } from "react-icons/ai";
import {
  BsGlobeAmericas,
  BsPersonWorkspace,
  BsTelephone,
} from "react-icons/bs";
import { GiBookmark } from "react-icons/gi";
import { FaRegAddressBook } from "react-icons/fa";
import { MdOutlineVilla } from "react-icons/md";
import { GoLocation } from "react-icons/go";
import { GrUserExpert } from "react-icons/gr";
import { getName, getCode } from "country-list";

import { createPosteController } from "../../controllers/posteController";
import { addPosteInfos } from "../../redux/slices/postesSlice";
import { useRouter } from "next/navigation";
import { UidContext } from "../../context/UidContext";
import Link from "next/link";

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

export default function Nouveau() {
  const { user } = useSelector((state) => state.user);
  const { path } = useContext(UidContext);
  const { push } = useRouter();

  const dispatch = useDispatch();

  const [active, setActive] = useState(links[0].path);
  const [telephone, setTelephone] = useState({ value: "", valid: false });
  const [paysCode, setPaysCode] = useState({ value: "", valid: false });
  const [paysName, setPaysName] = useState({ value: "", valid: false });
  const [region, setRegion] = useState({ value: "", valid: false });
  const [description, setDescription] = useState({ value: "", valid: false });
  const [ville, setVille] = useState({ value: "", valid: false });
  const [titre, setTitre] = useState({ value: "", valid: false });
  const [actualMission, setActualMission] = useState({
    value: "",
    valid: false,
  });
  const [missions, setMissions] = useState({
    value: [],
    valid: false,
  });
  const [actualCompetence, setActualCompetence] = useState({
    value: "",
    valid: false,
  });
  const [competences, setCompetences] = useState({
    value: [],
    valid: false,
  });
  const [actualExperience, setActualExperience] = useState({
    value: "",
    valid: false,
  });
  const [experiences, setExperiences] = useState({
    value: [],
    valid: false,
  });
  const [actualDiplome, setActualDiplome] = useState({
    value: "",
    valid: false,
  });
  const [diplomes, setDiplomes] = useState({
    value: [],
    valid: false,
  });
  const [actualQualite, setActualQualite] = useState({
    value: "",
    valid: false,
  });
  const [qualites, setQualites] = useState({
    value: [],
    valid: false,
  });
  const [actualFormation, setActualFormation] = useState({
    value: "",
    valid: false,
  });
  const [formations, setFormations] = useState({
    value: [],
    valid: false,
  });
  const [actualLangue, setActualLangue] = useState({ value: "", valid: false });
  const [langues, setLangues] = useState({
    value: [],
    valid: false,
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

  const cities = !isEmpty(region.value)
    ? City.getCitiesOfState(paysCode.value, region.value).map((city) => ({
        value: city.name,
        label: city.name,
      }))
    : [];

  useEffect(() => {
    // titre
    if (titre.value?.trim().length > 1) {
      setTitre((prev) => ({ ...prev, valid: true }));
    } else {
      setTitre((prev) => ({ ...prev, valid: false }));
    }

    // telephone
    if (isValidPhoneNumber(telephone.value)) {
      setTelephone((prev) => ({ ...prev, valid: true }));
    } else {
      setTelephone((prev) => ({ ...prev, valid: false }));
    }

    // paysCode
    if (paysCode.value?.trim().length > 1) {
      setPaysCode((prev) => ({ ...prev, valid: true }));
      setPaysName((prev) => ({
        ...prev,
        valid: true,
        value: getName(paysCode.value),
      }));
    } else {
      setPaysCode((prev) => ({ ...prev, valid: false }));
      setPaysName((prev) => ({
        ...prev,
        valid: false,
        value: "",
      }));
    }

    // region
    if (!isEmpty(region.value?.trim())) {
      setRegion((prev) => ({ ...prev, valid: true }));
    } else {
      setRegion((prev) => ({ ...prev, valid: false }));
    }

    // ville
    if (!isEmpty(ville.value?.trim())) {
      setVille((prev) => ({ ...prev, valid: true }));
    } else {
      setVille((prev) => ({ ...prev, valid: false }));
    }

    // description
    if (description.value?.trim()?.length > 5) {
      setDescription((prev) => ({ ...prev, valid: true }));
    } else {
      setDescription((prev) => ({ ...prev, valid: false }));
    }
  }, [
    titre.value,
    telephone.value,
    paysCode.value,
    region.value,
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

    if (titre.valid && !isEmpty(missions.value)) {
      setIsLoading(true);
      const res = await createPosteController({
        id: user.id,
        titre: titre.value.trim(),
        telephone: telephone.valid ? telephone.value.trim() : null,
        pays: paysName.valid ? paysName.value.trim() : null,
        region: region.valid ? region.value.trim() : null,
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
        dispatch(addPosteInfos({ poste: res.poste }));
        const url = qs.stringifyUrl(
          {
            url: path,
            query: {
              path: "postes",
            },
          },
          { skipNull: true }
        );
        push(url);
      }
    }
  };

  return (
    <>
      <div className="w-full h-full bg-white flex flex-col">
        <Top label={"Nouveau"} />

        <div className="flex-1 bg-slate-100 p-8 rounded-md h-full overflow-auto">
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
                {/* Poste */}
                <div className="flex flex-col gap-2 justify-between col-span-2">
                  <label
                    htmlFor="titre"
                    className="font-semibold flex items-center gap-2"
                  >
                    <i>
                      <AiOutlineNodeExpand size={"1.25rem"} />
                    </i>
                    <span>Titre du poste</span>
                  </label>
                  <input
                    type="text"
                    id="titre"
                    placeholder="Stagiaire en ..."
                    value={titre.value}
                    onChange={(e) =>
                      setTitre((prev) => ({ ...prev, value: e.target.value }))
                    }
                    className="bg-slate-200 py-1 px-4 focus:outline-1 focus:outline-slate-300 outline-offset-2 h-10"
                  />
                </div>

                {/* pays */}
                <div className="flex flex-col gap-2 justify-between">
                  <label
                    htmlFor="pays"
                    className="font-semibold flex gap-2 items-center"
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
                    className="font-semibold flex gap-2 items-center"
                  >
                    <i>
                      <GoLocation size={"1.15rem"} />
                    </i>
                    Region
                  </label>
                  {!isEmpty(paysCode.value) ? (
                    <Select
                      options={states}
                      value={states.find((item) => item.label === region.value)}
                      onChange={(e) =>
                        setRegion((prev) => ({
                          ...prev,
                          value: e.label,
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

                {/* telephone */}
                <div className="gap-2 flex flex-col justify-between">
                  <label
                    htmlFor="telephone"
                    className="font-semibold flex gap-2 items-center"
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
                    className="font-semibold flex gap-2 items-center"
                  >
                    <i>
                      <MdOutlineVilla size={"1.25rem"} />
                    </i>
                    Ville
                  </label>
                  {!isEmpty(region.value) ? (
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

                {/* Description */}
                <div className="flex flex-col gap-2 row-span-2 col-span-4">
                  <label
                    htmlFor="description"
                    className="font-semibold flex items-center gap-2"
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
                    className="bg-slate-200 py-2 px-4 focus:outline-1 focus:outline-slate-300 outline-offset-2"
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
                      path: "postes",
                    },
                  }}
                  className="flex justify-center items-center text-red-500 border border-red-500 hover:bg-[var(--bg-red-5)] h-10 rounded-sm w-full"
                >
                  <span>Annuler</span>
                </Link>
                <button
                  type="submit"
                  disabled={!titre.valid || isEmpty(missions.value)}
                  className={`bg-green-500 text-white h-10 rounded-sm w-full ${
                    titre.valid && !isEmpty(missions.value)
                      ? "opacity-100 cursor-pointer"
                      : "opacity-50"
                  }`}
                >
                  <span>Ajouter</span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
