"use client";

import { TRANSLATOR_SELECT_LIST } from "@/app/_constants/locale.constants";
import { TRANSLATOR_SELECT_BOX_DEFAULT_VALUE } from "@/app/_constants/index.constants";
import { Select } from "@vapor-ui/core";

export default function TranslatorSelectBox() {
  return (
    <Select.Root
      placeholder=""
      defaultValue={TRANSLATOR_SELECT_BOX_DEFAULT_VALUE}
    >
      <Select.Trigger>
        <Select.Value />
        <Select.TriggerIcon />
      </Select.Trigger>

      <Select.Content>
        <Select.Group>
          {TRANSLATOR_SELECT_LIST.map((locale) => (
            <Select.Item key={locale.value} value={locale.value}>
              {locale.label}
              <Select.ItemIndicator />
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
}
