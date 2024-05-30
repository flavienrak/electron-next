"use client";

import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Select from "react-select";
import ReactFlagsSelect from "react-flags-select";

import {
  MdAssuredWorkload,
  MdOutlineAssuredWorkload,
  MdOutlineSensorOccupied,
  MdOutlineVilla,
  MdOutlineWorkOutline,
} from "react-icons/md";
import { TbMoodEdit } from "react-icons/tb";
import { GoLocation } from "react-icons/go";
import { BsGlobeAmericas } from "react-icons/bs";
import { GrLanguage, GrLocal, GrUserExpert } from "react-icons/gr";
import { IoCamera, IoCloseOutline } from "react-icons/io5";
import { AiOutlineUser } from "react-icons/ai";
import { BsTelephone } from "react-icons/bs";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Country, State, City } from "country-state-city";
import { FiPlus } from "react-icons/fi";
import { isEmpty } from "../../lib/isEmpty";

export default function EditProfil({ setIsEditProfil }) {
  const { user } = useSelector((state) => state.user);
  const [nom, setNom] = useState({ value: user.nom, valid: false });
  const [prenom, setPrenom] = useState({ value: user.prenom, valid: false });
  const [telephone, setTelephone] = useState({ value: "", valid: false });
  const [role, setRole] = useState({ value: "", valid: false });
  const [biographie, setBiographie] = useState({ value: "", valid: false });
  const [actualPoste, setActualPoste] = useState({ value: "", valid: false });
  const [postes, setPostes] = useState({ value: [], valid: false });
  const [competences, setCompetences] = useState({ value: [], valid: false });
  const [experiences, setExperiences] = useState({ value: [], valid: false });
  const [formations, setFormations] = useState({ value: [], valid: false });
  const [langues, setLangues] = useState({ value: [], valid: false });
  const [isSubmit, setIsSubmit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [pays, setPays] = useState("");
  const [province, setProvince] = useState(null);
  const [ville, setVille] = useState(null);

  const states = !isEmpty(pays)
    ? State.getStatesOfCountry(pays).map((state) => ({
        value: state.isoCode,
        label: state.name,
      }))
    : [];

  const cities = !isEmpty(province)
    ? City.getCitiesOfState(pays, province).map((city) => ({
        value: city.name,
        label: city.name,
      }))
    : [];

  useEffect(() => {
    // nom
    if (nom.value?.trim()?.length > 2) {
      setNom((prev) => ({ ...prev, valid: true }));
    } else {
      setNom((prev) => ({ ...prev, valid: false }));
    }

    // prenom
    if (prenom.value?.trim()?.length > 2) {
      setPrenom((prev) => ({ ...prev, valid: true }));
    } else {
      setPrenom((prev) => ({ ...prev, valid: false }));
    }
  }, [nom.value, prenom.value]);

  useEffect(() => {
    // actualposte
    if (actualPoste.value?.trim()?.length > 2) {
      setActualPoste((prev) => ({ ...prev, valid: true }));
    } else {
      setActualPoste((prev) => ({ ...prev, valid: false }));
    }
  }, [actualPoste.value]);

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (actualPoste.valid) {
        setPostes((prev) => {
          let newState = { ...prev };
          newState.value = [...newState.value, actualPoste.value];
          return newState;
        });
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmit(true);

    if (nom.valid && prenom.valid) {
      setIsLoading(true);
      const res = await signUpController({
        nom: nom.value,
        prenom: prenom.value,
      });
      setIsLoading(false);

      if (res?.userAlreadyExist) {
        addMessage({
          value: `L'adresse email ${email.value} est déjà enregistré.`,
          type: "error",
        });
      } else if (res?.user) {
        addMessage({
          value: `Le compte a été créé avec succés. Veuillez vous connecter.`,
          type: "success",
        });
        push("/home?path=signIn");
      }
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="flex gap-4 flex-col">
        <div className="flex justify-between w-full items-center gap-10">
          <div className="w-1/4 flex justify-center items-center h-full">
            <div className="relative flex justify-center items-center min-h-36 min-w-36 w-36 rounded-full bg-slate-200">
              <span className="text-6xl">M</span>
              <label
                htmlFor="file"
                className="absolute bottom-1 right-1 min-w-8 min-h-8 flex justify-center items-center bg-white rounded-full cursor-pointer"
              >
                <IoCamera size={"1.5rem"} />
              </label>
              <input id="file" type="file" className="hidden" />
            </div>
          </div>
          <div className="w-1/4 flex flex-col justify-between gap-2 h-full">
            <div className="w-full gap-2 flex flex-col">
              <label
                htmlFor="nom"
                className="font-semibold flex gap-2 items-center"
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
                className="flex items-center bg-slate-200 h-10 px-4 rounded-sm focus:outline-slate-300 focus:outline-offset-2 uppercase"
              />
            </div>
            <div className="w-full gap-2 flex flex-col">
              <label
                htmlFor="prenom"
                className="font-semibold flex gap-2 items-center"
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
                className="flex items-center bg-slate-200 h-10 px-4 rounded-sm focus:outline-slate-300 focus:outline-offset-2 capitalize"
              />
            </div>
          </div>

          <div className="w-1/4 flex flex-col justify-between gap-2 h-full">
            <div className="flex flex-col gap-2">
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
                selected={pays}
                onSelect={(p) => setPays(p)}
                placeholder={"Pays"}
              />
            </div>
            <div className="w-full gap-2 flex flex-col">
              <label
                htmlFor="telephone"
                className="font-semibold flex gap-2 items-center"
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
                onChange={(e) => {
                  console.log(e);
                  setTelephone((prev) => ({ ...prev, value: e }));
                }}
                inputProps={{ required: true }}
                className="flex items-center h-10 px-4 rounded-sm"
              />
            </div>
          </div>
          <div className="w-1/4 flex flex-col justify-between gap-2 h-full">
            <div className="flex flex-col gap-2">
              <label
                htmlFor="region"
                className="font-semibold flex gap-2 items-center"
              >
                <i>
                  <GoLocation size={"1.15rem"} />
                </i>
                Region
              </label>
              {!isEmpty(pays) ? (
                <Select
                  options={states}
                  value={province}
                  onChange={(e) => setProvince(e)}
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
            <div className="flex flex-col gap-2">
              <label
                htmlFor="region"
                className="font-semibold flex gap-2 items-center"
              >
                <i>
                  <MdOutlineVilla size={"1.25rem"} />
                </i>
                Ville
              </label>
              {!isEmpty(province) ? (
                <Select
                  options={cities}
                  value={ville}
                  onChange={(e) => setVille(e)}
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
          </div>
        </div>

        <div className="w-full grid grid-cols-2 gap-x-10 gap-y-4">
          <div className="w-full gap-2 flex flex-col">
            <label
              htmlFor="poste"
              className="font-semibold flex gap-2 items-center"
            >
              <i>
                <MdAssuredWorkload size={"1rem"} />
              </i>
              Postes
            </label>
            {!isEmpty(postes.value) && (
              <div className="flex gap-2 flex-wrap">
                {postes.value.map((p, index) => (
                  <p className="bg-slate-200 py-1 pl-4 pr-2 rounded-full flex items-center gap-2">
                    <span className="text-xs text-slate-600">{p}</span>
                    <i
                      onClick={() =>
                        setPostes((prev) => {
                          let newState = { ...prev };
                          newState.value.splice(index, 1);
                          return newState;
                        })
                      }
                      className="text-slate-950 cursor-pointer"
                    >
                      <IoCloseOutline size={"1rem"} />
                    </i>
                  </p>
                ))}
              </div>
            )}
            <div className="w-full flex justify-between gap-2 items-center">
              <input
                id="poste"
                value={actualPoste.value}
                onChange={(e) =>
                  setActualPoste((prev) => ({ ...prev, value: e.target.value }))
                }
                onKeyDown={handleEnter}
                className="flex items-center bg-slate-200 h-10 px-4 rounded-sm focus:outline-slate-300 focus:outline-offset-2 flex-1"
              />
              <button className="flex justify-center items-center bg-slate-300 h-full px-2 rounded-sm">
                <FiPlus size={"1rem"} />
              </button>
            </div>
          </div>
          <div className="w-full gap-2 flex flex-col">
            <label
              htmlFor="role"
              className="font-semibold flex gap-2 items-center"
            >
              <i>
                <MdOutlineSensorOccupied size={"1rem"} />
              </i>
              Role
            </label>
            <div className="w-full flex justify-between gap-2 items-center">
              <input
                id="role"
                className="flex items-center bg-slate-200 h-10 px-4 rounded-sm focus:outline-slate-300 focus:outline-offset-2 flex-1"
              />
              <button className="flex justify-center items-center bg-slate-300 h-full px-2 rounded-sm">
                <FiPlus size={"1rem"} />
              </button>
            </div>
          </div>
          <div className="w-full gap-2 flex flex-col">
            <label
              htmlFor="competence"
              className="font-semibold flex gap-2 items-center"
            >
              <i>
                <MdOutlineWorkOutline size={"1rem"} />
              </i>
              Competences
            </label>
            <div className="w-full flex justify-between gap-2 items-center">
              <input
                id="competence"
                className="flex items-center bg-slate-200 h-10 px-4 rounded-sm focus:outline-slate-300 focus:outline-offset-2 flex-1"
              />
              <button className="flex justify-center items-center bg-slate-300 h-full px-2 rounded-sm">
                <FiPlus size={"1rem"} />
              </button>
            </div>
          </div>
          <div className="w-full gap-2 flex flex-col">
            <label
              htmlFor="experience"
              className="font-semibold flex gap-2 items-center"
            >
              <i>
                <GrUserExpert size={"1rem"} />
              </i>
              Experiences
            </label>
            <div className="w-full flex justify-between gap-2 items-center">
              <input
                id="experience"
                className="flex items-center bg-slate-200 h-10 px-4 rounded-sm focus:outline-slate-300 focus:outline-offset-2 flex-1"
              />
              <button className="flex justify-center items-center bg-slate-300 h-full px-2 rounded-sm">
                <FiPlus size={"1rem"} />
              </button>
            </div>
          </div>
          <div className="w-full gap-2 flex flex-col row-span-2">
            <label
              htmlFor="biographie"
              className="font-semibold flex gap-2 items-center"
            >
              <i>
                <TbMoodEdit size={"1.25rem"} />
              </i>
              Biographie
            </label>
            <textarea
              id="biographie"
              rows={4}
              className="flex items-center bg-slate-200 p-2 rounded-sm focus:outline-slate-300 focus:outline-offset-2 h-full"
            />
          </div>
          <div className="w-full gap-2 flex flex-col">
            <label
              htmlFor="formation"
              className="font-semibold flex gap-2 items-center"
            >
              <i>
                <MdOutlineAssuredWorkload size={"1rem"} />
              </i>
              Formations
            </label>
            <div className="w-full flex justify-between gap-2 items-center">
              <input
                id="formation"
                className="flex items-center bg-slate-200 h-10 px-4 rounded-sm focus:outline-slate-300 focus:outline-offset-2 flex-1"
              />
              <button className="flex justify-center items-center bg-slate-300 h-full px-2 rounded-sm">
                <FiPlus size={"1rem"} />
              </button>
            </div>
          </div>
          <div className="w-full gap-2 flex flex-col">
            <label
              htmlFor="langue"
              className="font-semibold flex gap-2 items-center"
            >
              <i>
                <GrLanguage size={"1rem"} />
              </i>
              Langues
            </label>
            <div className="w-full flex justify-between gap-2 items-center">
              <input
                id="langue"
                className="flex items-center bg-slate-200 h-10 px-4 rounded-sm focus:outline-slate-300 focus:outline-offset-2 flex-1"
              />
              <button className="flex justify-center items-center bg-slate-300 h-full px-2 rounded-sm">
                <FiPlus size={"1rem"} />
              </button>
            </div>
          </div>
          <div className="py-2 flex gap-4 w-full">
            <button
              type="reset"
              onClick={() => setIsEditProfil(false)}
              className="bg-red-500 text-white h-10 rounded-sm w-full"
            >
              <span>Annuler</span>
            </button>
            <button
              type="submit"
              className="bg-green-500 text-white h-10 rounded-sm w-full"
            >
              <span>Mettre a jour</span>
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
