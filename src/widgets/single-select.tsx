/** @jsxImportSource @emotion/react */
import { useField } from "formik";
import { useSelect } from "downshift";
import { useId } from "@reach/auto-id";
import React from "react";
import { FixedSizeList } from "react-window";
import InputError from "./input-error";

type Item = { label: string | React.ReactNode; value: string };

type PropTypes = React.InputHTMLAttributes<HTMLSelectElement> & {
  name: string;
  label: string;
  description?: React.ReactNode | string;
  width?: string | number | Array<string | number>;
  items: Item[];
  readOnly?: boolean;
};

const SingleSelect: React.FC<PropTypes> = ({
  name,
  label,
  description,
  readOnly,
  items,
  width = "100%",
  placeholder = "Select",
}) => {
  const [field, meta, helpers] = useField(name);
  const selectedItem = React.useMemo(() => {
    if (!field.value) return null;
    return items.find((item) => item.value === field.value.toString());
  }, [items, field.value]);
  const prefix = useId();
  const hasError = Boolean(meta.error);
  const {
    isOpen,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    highlightedIndex,
    getItemProps,
  } = useSelect({
    items,
    selectedItem,
    onSelectedItemChange: ({ selectedItem }) => {
      if (selectedItem) helpers.setValue(selectedItem.value);
      else helpers.setValue(undefined);
    },
  });

  const inputId = `${prefix}-${name}`;
  const labelId = `${inputId}-label`;
  const descriptionId = `${inputId}-description`;
  const errorId = `${inputId}-error`;

  const describedBy = [
    description ? descriptionId : undefined,
    hasError ? errorId : undefined,
  ].filter(Boolean);

  const options = {
    "aria-describedby": describedBy.length ? describedBy.join(" ") : undefined,
  };

  const dropdownStyles = {
    open: {
      zIndex: 999999,
    },
    closed: {
      border: "none",
      margin: 0,
      boxShadow: 0,
      padding: 0,
    },
  };

  return (
    <div css={{ marginBottom: 16 }}>
      <label
        id={labelId}
        htmlFor={inputId}
        {...getLabelProps({ htmlFor: inputId, id: labelId })}
      >
        {label}
      </label>
      {description && <div id={descriptionId}>{description}</div>}
      <button
        type="button"
        {...options}
        disabled={readOnly}
        aria-labelledby={labelId}
        {...getToggleButtonProps({ id: inputId })}
        css={{
          display: "block",
          border: "1px solid #141430",
          borderRadius: 0,
          fontSize: "14px",
          height: 48,
          minWidth: 256,
          padding: "0 0 0 8px",
          textAlign: "left",
          background: "transparent",
        }}
      >
        <div>{selectedItem?.label || placeholder}</div>
      </button>
      <div style={{ position: "relative" }}>
        <ul
          role="listbox"
          {...getMenuProps(options)}
          css={{
            boxShadow:
              "0px 0px 0px 1px rgba(25, 25, 36, 0.1), 0px 3px 12px rgba(25, 25, 36, 0.1)",
            background: "white",
            marginTop: -1,
            listStyleType: "none",
            maxHeight: "207px",
            width: "256px",
            overflowY: "auto",
            overflowX: "hidden",
            position: "absolute",
            padding: "0",
            ...dropdownStyles[isOpen ? "open" : "closed"],
          }}
        >
          {isOpen && (
            <>
              <FixedSizeList
                itemData={items}
                itemCount={items.length}
                height={207}
                itemSize={32}
                width={256}
              >
                {({ index, style, data }) => {
                  const item = data[index];
                  return (
                    <li
                      key={item.value}
                      className={[
                        highlightedIndex === index ? "active" : "",
                        selectedItem && selectedItem.value === item.value
                          ? "selected"
                          : "",
                      ].join(" ")}
                      {...getItemProps({ item, index })}
                      css={{
                        cursor: "pointer",
                        minHeight: "32px",
                        padding: "0 2px 0 8px",
                        display: "flex",
                        alignItems: "center",
                        "&.selected": {
                          background: "#D7EFF6",
                        },
                        "&.active": {
                          background: "#E5F5FB",
                        },
                      }}
                      style={style}
                    >
                      {data[index].label}
                    </li>
                  );
                }}
              </FixedSizeList>
              {/* {items.map((item, index) => (
                <li
                  key={item.value}
                  className={[
                    highlightedIndex === index ? "active" : "",
                    selectedItem && selectedItem.value === item.value
                      ? "selected"
                      : "",
                  ].join(" ")}
                  {...getItemProps({ item, index })}
                  css={{
                    cursor: "pointer",
                    minHeight: "32px",
                    padding: "0 2px 0 8px",
                    display: "flex",
                    alignItems: "center",
                    "&.selected": {
                      background: "#D7EFF6",
                    },
                    "&.active": {
                      background: "#E5F5FB",
                    },
                  }}
                >
                  {item.label}
                </li>
              ))} */}
            </>
          )}
        </ul>
      </div>
      <InputError id={errorId} errorMessage={meta.error} />
    </div>
  );
};

export default SingleSelect;
