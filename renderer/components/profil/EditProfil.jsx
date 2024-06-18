"use client";

import "react-phone-input-2/lib/style.css";

import PhoneInput from "react-phone-input-2";
import Select from "react-select";
import ReactFlagsSelect from "react-flags-select";
import InputMulti from "../utils/InputMulti";

import { MdAssuredWorkload, MdOutlineVilla } from "react-icons/md";
import { GiBookmark } from "react-icons/gi";
import { TbMoodEdit } from "react-icons/tb";
import { GoLocation } from "react-icons/go";
import { BsGlobeAmericas, BsPersonWorkspace } from "react-icons/bs";
import { PiStudent } from "react-icons/pi";
import { GrUserExpert } from "react-icons/gr";
import { IoCamera } from "react-icons/io5";
import { AiOutlineUser } from "react-icons/ai";
import { BsTelephone } from "react-icons/bs";
import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { State, City } from "country-state-city";
import { isEmpty } from "../../lib/allFunctions";
import { isValidPhoneNumber } from "../../lib/allFunctions";

import { editProfilController } from "../../controllers/userController";
import { updateUserInfos } from "../../redux/slices/userSlice";
import { FaRegAddressBook } from "react-icons/fa";
import { getName, getCode } from "country-list";
import Image from "next/image";
import { UidContext } from "../../context/UidContext";

const links = [
  {
    label: "Informations personnelles",
    path: "inf-personnelle",
  },
  {
    label: "Informations professionnelles",
    path: "inf-professionnelle",
  },
];

export default function EditProfil({ setIsEditProfil }) {
  const { user } = useSelector((state) => state.user);
  const { ip } = useSelector((state) => state.persistInfos);
  const { addMessage } = useContext(UidContext);
  const dispatch = useDispatch();

  const [active, setActive] = useState(links[0].path);
  const [nom, setNom] = useState({ value: user.nom, valid: false });
  const [prenom, setPrenom] = useState({ value: user.prenom, valid: false });
  const [file, setFile] = useState(null);
  const [image, setImage] = useState("");
  const [telephone, setTelephone] = useState({
    value: user.telephone || "",
    valid: false,
  });
  const [biographie, setBiographie] = useState({
    value: user.biographie || "",
    valid: false,
  });
  const [paysCode, setPaysCode] = useState({
    value: getCode(user.pays) || "",
    valid: false,
  });
  const [paysName, setPaysName] = useState({
    value: user.pays || "",
    valid: false,
  });
  const [regionName, setRegionName] = useState({
    value: user.region || "",
    valid: false,
  });
  const [ville, setVille] = useState({ value: user.ville || "", valid: false });
  const [actualPoste, setActualPoste] = useState({ value: "", valid: false });
  const [postes, setPostes] = useState({
    value: user.postes || [],
    valid: false,
  });
  const [actualQualite, setActualQualite] = useState({
    value: "",
    valid: false,
  });
  const [qualites, setQualites] = useState({
    value: user.qualites || [],
    valid: false,
  });
  const [actualCompetence, setActualCompetence] = useState({
    value: "",
    valid: false,
  });
  const [competences, setCompetences] = useState({
    value: user.competences || [],
    valid: false,
  });
  const [actualExperience, setActualExperience] = useState({
    value: "",
    valid: false,
  });
  const [experiences, setExperiences] = useState({
    value: user.experiences || [],
    valid: false,
  });
  const [actualDiplome, setActualDiplome] = useState({
    value: "",
    valid: false,
  });
  const [diplomes, setDiplomes] = useState({
    value: user.diplomes || [],
    valid: false,
  });
  const [actualFormation, setActualFormation] = useState({
    value: "",
    valid: false,
  });
  const [formations, setFormations] = useState({
    value: user.formations || [],
    valid: false,
  });
  const [actualLangue, setActualLangue] = useState({ value: "", valid: false });
  const [langues, setLangues] = useState({
    value: user.langues || [],
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

  const [regionCode, setRegionCode] = useState({
    value: !isEmpty(user.region)
      ? states.find((item) => item.label === user.region)?.value
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
    // nom
    if (nom.value?.trim()?.length > 2 && nom.value?.trim() !== user.nom) {
      setNom((prev) => ({ ...prev, valid: true }));
      if (!canSubmit) {
        setCanSubmit(true);
      }
    } else {
      setNom((prev) => ({ ...prev, valid: false }));
    }

    // prenom
    if (
      prenom.value?.trim()?.length > 2 &&
      prenom.value?.trim() !== user.prenom
    ) {
      setPrenom((prev) => ({ ...prev, valid: true }));
      if (!canSubmit) {
        setCanSubmit(true);
      }
    } else {
      setPrenom((prev) => ({ ...prev, valid: false }));
    }

    // telephone
    if (
      isValidPhoneNumber(telephone.value) &&
      telephone.value?.trim() !== user.telephone
    ) {
      setTelephone((prev) => ({ ...prev, valid: true }));
      if (!canSubmit) {
        setCanSubmit(true);
      }
    } else {
      setTelephone((prev) => ({ ...prev, valid: false }));
    }

    // paysCode
    if (!isEmpty(paysCode.value)) {
      setPaysCode((prev) => ({ ...prev, valid: true }));
      setPaysName((prev) => ({
        ...prev,
        valid: true,
        value: getName(paysCode.value),
      }));
    } else {
      setPaysCode((prev) => ({ ...prev, valid: false }));
    }

    // region code
    if (!isEmpty(regionCode.value)) {
      setRegionCode((prev) => ({ ...prev, valid: true }));
      setRegionName((prev) => ({
        ...prev,
        valid: true,
        value: states.find((item) => item.value === regionCode.value)?.label,
      }));
    } else {
      setRegionCode((prev) => ({ ...prev, valid: false }));
      setRegionName((prev) => ({
        ...prev,
        valid: false,
        value: "",
      }));
    }

    // ville
    // if (!isEmpty(ville.value)) {
    //   setVille((prev) => ({ ...prev, valid: true }));
    //   if (!canSubmit) {
    //     setCanSubmit(true);
    //   }
    // } else {
    //   setVille((prev) => ({ ...prev, valid: false }));
    // }

    // biographie
    if (
      biographie.value?.trim()?.length > 5 &&
      biographie.value?.trim() !== user.biographie
    ) {
      setBiographie((prev) => ({ ...prev, valid: true }));
      if (!canSubmit) {
        setCanSubmit(true);
      }
    } else {
      setBiographie((prev) => ({ ...prev, valid: false }));
    }
  }, [
    nom.value,
    prenom.value,
    biographie.value,
    telephone.value,
    paysCode.value,
    regionCode.value,
    ville.value,
  ]);

  useEffect(() => {
    // actual titre
    if (actualPoste.value?.trim()?.length > 1) {
      setActualPoste((prev) => ({ ...prev, valid: true }));
    } else {
      setActualPoste((prev) => ({ ...prev, valid: false }));
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

    // actual formation
    if (actualFormation.value?.trim()?.length > 1) {
      setActualFormation((prev) => ({ ...prev, valid: true }));
    } else {
      setActualFormation((prev) => ({ ...prev, valid: false }));
    }

    // actual qualite
    if (actualQualite.value?.trim()?.length > 1) {
      setActualQualite((prev) => ({ ...prev, valid: true }));
    } else {
      setActualQualite((prev) => ({ ...prev, valid: false }));
    }

    // actual langue
    if (actualLangue.value?.trim()?.length > 1) {
      setActualLangue((prev) => ({ ...prev, valid: true }));
    } else {
      setActualLangue((prev) => ({ ...prev, valid: false }));
    }
  }, [
    actualPoste.value,
    actualCompetence.value,
    actualExperience.value,
    actualFormation.value,
    actualDiplome.value,
    actualQualite.value,
    actualLangue.value,
  ]);

  useEffect(() => {
    if (file) {
      const newUrl = URL.createObjectURL(file);
      setImage(newUrl);
      if (!canSubmit) {
        setCanSubmit(true);
      }
      return () => {
        URL.revokeObjectURL(newUrl);
      };
    }
  }, [file]);

  const handleAdd = (actual) => {
    if (!canSubmit) {
      setCanSubmit(true);
    }

    if (actualPoste.valid && actual === "poste") {
      setPostes((prev) => {
        let newState = { ...prev };
        newState.valid = true;
        newState.value = [...newState.value, actualPoste.value];
        return newState;
      });
      setActualPoste({ valid: false, value: "" });
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
    } else if (actualFormation.valid && actual === "formation") {
      setFormations((prev) => {
        let newState = { ...prev };
        newState.valid = true;
        newState.value = [...newState.value, actualFormation.value];
        return newState;
      });
      setActualFormation({ valid: false, value: "" });
    } else if (actualQualite.valid && actual === "qualite") {
      setQualites((prev) => {
        let newState = { ...prev };
        newState.valid = true;
        newState.value = [...newState.value, actualQualite.value];
        return newState;
      });
      setActualQualite({ valid: false, value: "" });
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

    if (actual === "poste") {
      setPostes((prev) => {
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

    if (canSubmit) {
      setIsLoading(true);
      const res = await editProfilController({
        ip,
        id: user.id,
        nom: nom.valid ? nom.value : null,
        prenom: prenom.valid ? prenom.value : null,
        telephone: telephone.valid ? telephone.value : null,
        biographie: biographie.valid ? biographie.value : null,
        pays: paysName.valid ? paysName.value : null,
        region: regionName.valid ? regionName.value : null,
        ville: ville.valid ? ville.value : null,
        postes: postes.valid ? postes.value : null,
        diplomes: diplomes.valid ? diplomes.value : null,
        competences: competences.valid ? competences.value : null,
        experiences: experiences.valid ? experiences.value : null,
        formations: formations.valid ? formations.value : null,
        qualites: qualites.valid ? qualites.value : null,
        langues: langues.valid ? langues.value : null,
      });
      setIsLoading(false);

      if (res?.user) {
        dispatch(updateUserInfos({ user: res.user }));
        addMessage({
          value: `Votre profil a ete mis a jour avec succes.`,
          type: "success",
        });
      }
      setIsEditProfil(false);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex flex-1 gap-10 flex-col bg-[var(--bg-1)] p-8 rounded-md overflow-auto max-h-full scr"
      >
        <div className="flex justify-between gap-10">
          {links.map((item) => (
            <label
              key={item.path}
              onClick={() => setActive(item.path)}
              className={`flex items-center justify-center whitespace-nowrap w-1/2 h-10 uppercase rounded-sm border border-[var(--primary-color)] cursor-pointer ${
                active === item.path
                  ? "bgGradient text-white"
                  : "text-[var(--primary-color)]"
              }`}
            >
              {item.label}
            </label>
          ))}
        </div>

        {active === links[0].path && (
          <div className="flex flex-col gap-4">
            <div className="flex justify-between w-full items-center gap-10">
              {/* profil */}
              <div className="w-1/4 flex justify-center items-center h-full">
                <div
                  className={`relative flex justify-center items-center min-h-36 min-w-36 w-36 rounded-full border border-[var(--primary-color)] ${
                    !isEmpty(image) ? "" : "bgGradient"
                  } `}
                >
                  {!isEmpty(image) ? (
                    <div className="relative h-36 w-36 rounded-full">
                      <Image
                        src={image}
                        fill
                        alt=""
                        objectFit="cover"
                        className="rounded-full"
                      />
                    </div>
                  ) : (
                    <span className="text-6xl uppercase text-[var(--white)]">
                      {nom.value?.charAt(0)}
                    </span>
                  )}
                  {/* <label
                    htmlFor="file"
                    className="absolute bottom-1 right-1 min-w-8 min-h-8 flex justify-center items-center bg-white rounded-full cursor-pointer text-[var(--primary-color)]"
                  >
                    <IoCamera size={"1.5rem"} />
                  </label>
                  <input
                    id="file"
                    type="file"
                    accept=".png,.jpg,.jpeg"
                    onChange={(e) => setFile(e.target.files[0])}
                    className="hidden"
                  /> */}
                </div>
              </div>

              {/* infos */}
              <div className="w-1/4 flex flex-col justify-between gap-2 h-full">
                {/* nom */}
                <div className="w-full gap-2 flex flex-col">
                  <label
                    htmlFor="nom"
                    className="font-semibold flex gap-2 items-center text-[var(--cont)]"
                  >
                    <i>
                      <AiOutlineUser size={"1rem"} />
                    </i>
                    Nom
                  </label>
                  <input
                    id="nom"
                    value={nom.value}
                    onChange={(e) =>
                      setNom((prev) => ({ ...prev, value: e.target.value }))
                    }
                    className="flex items-center bg-[var(--bg)] h-10 px-4 rounded-sm focus:outline-slate-300 focus:outline-offset-2 text-[var(--cont)]"
                  />
                </div>

                {/* prenom */}
                <div className="w-full gap-2 flex flex-col">
                  <label
                    htmlFor="prenom"
                    className="font-semibold flex gap-2 items-center text-[var(--cont)]"
                  >
                    <i>
                      <AiOutlineUser size={"1rem"} />
                    </i>
                    Prenom
                  </label>
                  <input
                    id="prenom"
                    value={prenom.value}
                    onChange={(e) =>
                      setPrenom((prev) => ({ ...prev, value: e.target.value }))
                    }
                    className="flex items-center bg-[var(--bg)] h-10 px-4 rounded-sm focus:outline-slate-300 focus:outline-offset-2 text-[var(--cont)]"
                  />
                </div>
              </div>

              {/* contacts */}
              <div className="w-1/4 flex flex-col justify-between gap-2 h-full">
                {/* pays */}
                <div className="flex flex-col gap-2">
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
                    onSelect={(p) =>
                      setPaysCode((prev) => ({ ...prev, value: p }))
                    }
                    placeholder={"Pays"}
                    searchPlaceholder="Rechercher..."
                    searchable
                  />
                </div>

                {/* telephone */}
                <div className="w-full gap-2 flex flex-col">
                  <label
                    htmlFor="telephone"
                    className="font-semibold flex gap-2 items-center text-[var(--cont)]"
                  >
                    <i>
                      <BsTelephone size={"1rem"} />
                    </i>
                    Telephone
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
              </div>

              {/* location */}
              <div className="w-1/4 flex flex-col justify-between gap-2 h-full">
                {/* region */}
                <div className="flex flex-col gap-2">
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
                      readOnly
                      placeholder="Region"
                      className="flex items-center bg-[var(--bg)] h-10 px-4 rounded-sm focus:outline-slate-300 focus:outline-offset-2"
                    />
                  )}
                </div>

                {/* ville */}
                <div className="flex flex-col gap-2">
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
                      selected={ville.value}
                      onChange={(e) =>
                        setVille((prev) => ({ ...prev, value: e.value }))
                      }
                      placeholder="Ville"
                    />
                  ) : (
                    <input
                      id="region"
                      readOnly
                      placeholder="Ville"
                      className="flex items-center bg-[var(--bg)] h-10 px-4 rounded-sm focus:outline-slate-300 focus:outline-offset-2"
                    />
                  )}
                </div>
              </div>
            </div>
            {/* biographie */}
            <div className="gap-2 flex flex-col justify-between row-span-2">
              <label
                htmlFor="biographie"
                className="font-semibold flex gap-2 items-center text-[var(--cont)]"
              >
                <i>
                  <TbMoodEdit size={"1.25rem"} />
                </i>
                Biographie
              </label>
              <textarea
                rows={5}
                id="biographie"
                placeholder="Biographie"
                value={biographie.value}
                onChange={(e) =>
                  setBiographie((prev) => ({
                    ...prev,
                    value: e.target.value,
                  }))
                }
                className="flex items-center bg-[var(--bg)] py-2 px-4 rounded-sm focus:outline-slate-300 focus:outline-offset-2 h-full text-[var(--cont)]"
              />
            </div>
          </div>
        )}

        {active === links[1].path && (
          <div className="w-full grid grid-cols-2 gap-x-10 gap-y-4">
            {/* postes */}
            <InputMulti
              id={"poste"}
              label={"Postes recherches"}
              placeholder={"Stagiaire"}
              array={postes.value}
              value={actualPoste.value}
              onChange={(e) =>
                setActualPoste((prev) => ({
                  ...prev,
                  value: e.target.value,
                }))
              }
              onAdd={() => handleAdd("poste")}
              onEnter={(e) => handleEnter(e, "poste")}
              onDelete={(index) => handleDelete("poste", index)}
              icon={<MdAssuredWorkload size={"1.25rem"} />}
            />

            {/* competences */}
            <InputMulti
              id={"competence"}
              label={"Competences"}
              placeholder={"Competences"}
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

            {/* diplomes */}
            <InputMulti
              id={"diplome"}
              label={"Diplomes"}
              placeholder={"Diplomes"}
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

            {/* formations */}
            <InputMulti
              id={"formation"}
              label={"Formations"}
              placeholder={"Formations"}
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

            {/* experiences */}
            <InputMulti
              id={"experience"}
              label={"Experiences"}
              placeholder={"Experiences"}
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

            {/* Qualites */}
            <InputMulti
              id={"qualite"}
              label={"Qualites"}
              placeholder={"Creatif"}
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
              icon={<BsPersonWorkspace size={"1.25rem"} />}
            />

            <div></div>

            {/* langues */}
            <InputMulti
              id={"langue"}
              label={"Langues"}
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
          </div>
        )}

        {/* buttons */}
        <div className="w-full flex justify-end">
          <div className="flex gap-10 w-1/2 pl-6">
            <button
              type="reset"
              onClick={() => setIsEditProfil(false)}
              className="text-red-500 border border-red-500 hover:bg-[var(--bg-red-5)] h-10 rounded-sm w-full"
            >
              <span>Annuler</span>
            </button>
            <button
              type="submit"
              disabled={!canSubmit}
              className={`bg-green-500 text-white h-10 rounded-sm w-full border border-green-500 ${
                canSubmit ? "opacity-100 cursor-pointer" : "opacity-50"
              }`}
            >
              <span>Mettre a jour</span>
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
