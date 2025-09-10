import { useCallback, useRef } from "react";
import { UseFormReturn } from "react-hook-form";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

import { createPosterFormSchemaType } from "@/features/poster/components/create-poster-form";
import { Option } from "@/features/poster/types";

import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { PhotoFrame } from "@/features/poster/components/create-poster-form/form/poster-form-photo-frame";
import { UploadImage } from "@/features/poster/components/create-poster-form/form/poster-form-upload-image";
import { SelectCar } from "@/features/poster/components/create-poster-form/form/poster-form-select-car";
import { InputInstagramName } from "@/features/poster/components/create-poster-form/form/poster-form-instagram";

export interface PosterFormProps {
  form: UseFormReturn<createPosterFormSchemaType>;
  frameOptions: Option[];
  carOptions: Option[];
}

export const PosterForm = ({ form, frameOptions, carOptions }: PosterFormProps) => {
  return (
    <>
      <PosterFormDesktopLayout form={form} frameOptions={frameOptions} carOptions={carOptions} />
      <PosterFormMobileLayout form={form} frameOptions={frameOptions} carOptions={carOptions} />
    </>
  );
};

const PosterFormDesktopLayout = ({ form, frameOptions, carOptions }: PosterFormProps) => {
  return (
    <div className='desktop:block hidden'>
      <Accordion type='multiple' className='w-full' defaultValue={["item-1", "item-2", "item-3", "item-4"]}>
        <AccordionItem value='item-1' className='border-0'>
          <AccordionTrigger>포토 프레임 선택</AccordionTrigger>
          <AccordionContent className='mb-[4.8rem] pt-[3.2rem] pb-[5.6rem] border-b border-border'>
            <PhotoFrame form={form} frameOptions={frameOptions} />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value='item-2' className='border-0'>
          <AccordionTrigger>이미지 업로드</AccordionTrigger>
          <AccordionContent className='mb-[4.8rem] pt-[3.2rem] pb-[5.6rem] border-b border-border'>
            <UploadImage form={form} />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value='item-3' className='border-0'>
          <AccordionTrigger>Kia 헤리티지 차량 선택</AccordionTrigger>
          <AccordionContent className='mb-[4.8rem] pt-[3.2rem] pb-[5.6rem] border-b border-border'>
            <SelectCar form={form} carOptions={carOptions} />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value='item-4' className='border-0'>
          <AccordionTrigger>타이틀 및 인스타그램 계정명 입력</AccordionTrigger>
          <AccordionContent className='pt-[3.2rem]'>
            <InputInstagramName form={form} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

const PosterFormMobileLayout = ({ form, frameOptions, carOptions }: PosterFormProps) => {
  const tabsRef = useRef<HTMLDivElement>(null);

  const handleChangeTab = useCallback((value: string) => {
    const tab = tabsRef.current?.querySelector(`[data-value="${value}"]`);
    if (tab) {
      tab.scrollIntoView({ inline: "center", behavior: "smooth", block: "nearest" });
    }
  }, []);

  return (
    <div className='desktop:hidden block'>
      <Tabs defaultValue='item-1' onValueChange={handleChangeTab}>
        <TabsList
          ref={tabsRef}
          className='max-w-full justify-start bg-white gap-[3.2rem] px-[3.2rem] border-b border-border overflow-x-auto scrollbar-hidden'
        >
          <TabsTrigger value='item-1' className='pt-[2.4rem] pb-[1.6rem]' data-value='item-1'>
            포토 프레임 선택
          </TabsTrigger>
          <TabsTrigger value='item-2' className='pt-[2.4rem] pb-[1.6rem]' data-value='item-2'>
            이미지 업로드
          </TabsTrigger>
          <TabsTrigger value='item-3' className='pt-[2.4rem] pb-[1.6rem]' data-value='item-3'>
            Kia 헤리티지 차량 선택
          </TabsTrigger>
          <TabsTrigger value='item-4' className='pt-[2.4rem] pb-[1.6rem]' data-value='item-4'>
            타이틀 및 인스타그램 계정명 입력
          </TabsTrigger>
        </TabsList>
        <TabsContent value='item-1' className='p-[2.4rem_3rem]'>
          <PhotoFrame form={form} frameOptions={frameOptions} />
        </TabsContent>
        <TabsContent value='item-2' className='p-[2.4rem_3rem]'>
          <UploadImage form={form} />
        </TabsContent>
        <TabsContent value='item-3' className='p-[2.4rem_3rem]'>
          <SelectCar form={form} carOptions={carOptions} />
        </TabsContent>
        <TabsContent value='item-4' className='p-[2.4rem_3rem]'>
          <InputInstagramName form={form} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export const ItemTitle = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return (
    <h3
      className={cn("desktop:text-[1.8rem] text-[1.6rem] font-bold desktop:leading-[3rem] leading-[2.6rem]", className)}
    >
      {children}
    </h3>
  );
};

export const ItemContent = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return <div className={cn("desktop:pt-[2.4rem] pt-[1.6rem]", className)}>{children}</div>;
};
