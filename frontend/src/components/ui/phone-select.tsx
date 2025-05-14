"use client"

import { useState, useEffect } from "react"
import { ChevronsUpDown, Check } from "lucide-react"
import ReactCountryFlag from "react-country-flag"
import { getCountries, getCountryCallingCode, AsYouType, parsePhoneNumber, isValidPhoneNumber } from "libphonenumber-js"
// import type { Country, E164Number } from "libphonenumber-js/types"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from "@/components/ui/command"
import { cn } from "@/lib/utils"
import { PhoneSelectData } from "@/types/phone-select-types"

const getCountryName = (code: any) => {
  try {
    return new Intl.DisplayNames(["en"], { type: "region" }).of(code) || code
  } catch {
    return code
  }
}

const countries = getCountries()
  .map((code) => ({
    code,
    name: getCountryName(code),
    dialCode: `+${getCountryCallingCode(code)}`,
  }))
  .sort((a, b) => a.name.localeCompare(b.name))

export default function PhoneSelect({ onChange,defaultCountry="PK" }: { onChange?: (val: PhoneSelectData) => void,defaultCountry?:string }) {
  const [open, setOpen] = useState(false)
  const [selectedCountry, setSelectedCountry] = useState(countries.find(c => c.code === defaultCountry) || countries[0])
  const [phone, setPhone] = useState("")
  const [formatted, setFormatted] = useState("")
  const [valid, setValid] = useState(false)

  useEffect(() => {
    const formatter = new AsYouType(selectedCountry.code)
    setFormatted(formatter.input(phone))

    let fullNumber = undefined
    let validCheck = false
    try {
      validCheck = isValidPhoneNumber(phone, selectedCountry.code)
      fullNumber = parsePhoneNumber(phone, selectedCountry.code)?.number as any
    } catch {}

    setValid(validCheck)

    onChange?.({
      country: selectedCountry,
      nationalNumber: phone,
      fullNumber,
      isValid: validCheck
    })
  }, [phone, selectedCountry])

  return (
    <div className="flex">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button type="button" variant="outline" className="w-[140px] justify-between border-r-0 rounded-r-none">
            <div className="flex items-center gap-2">
              <ReactCountryFlag countryCode={selectedCountry.code} svg style={{ width: "1.2em", height: "1.2em" }} />
              <span>{selectedCountry.dialCode}</span>
            </div>
            <ChevronsUpDown className="h-4 w-4 opacity-50 ml-auto" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[300px] p-0">
          <Command>
            <CommandInput placeholder="Search country..." />
            <CommandList>
              <CommandEmpty>No country found.</CommandEmpty>
              <CommandGroup className="max-h-[300px] overflow-y-auto">
                {countries.map((country) => (
                  <CommandItem
                    key={country.code}
                    value={`${country.name} ${country.dialCode}`}
                    onSelect={() => {
                      setSelectedCountry(country)
                      setOpen(false)
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <ReactCountryFlag countryCode={country.code} svg style={{ width: "1.2em", height: "1.2em" }} />
                      <span className="truncate">{country.name}</span>
                      <span className="ml-auto text-muted-foreground">{country.dialCode}</span>
                    </div>
                    <Check className={cn("ml-auto h-4 w-4", selectedCountry.code === country.code ? "opacity-100" : "opacity-0")} />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <Input
        type="tel"
        className="rounded-l-none"
        placeholder="Phone number"
        value={formatted}
        onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
      />
    </div>
  )
}
