-- SPDX-FileCopyrightText: 2024 Senne Van Baelen
--
-- SPDX-License-Identifier: MIT

--[[-- Filter images with this function if the target format is LaTeX.]]
--[[if FORMAT:match 'latex' then]]
  --[[function Image (elem)]]
    --[[-- Surround all images with image-centering raw LaTeX.]]

    --[[if string.find("", "subfloat") then]]
      --[[print ("YUUU.")]]
    --[[else]]
      --[[print ("noow")]]
    --[[end]]
    --[[return {]]
      --[[--pandoc.RawInline('latex', '\\hfill\\break{\\centering'),]]
      --[[elem,]]
      --[[--pandoc.RawInline('latex', '\\par}')]]
    --[[}]]
  --[[end]]
--[[end]]

--[[-- Filter images with this function if the target format is HTML]]
--[[if FORMAT:match 'html' then]]
  --[[function Image (elem)]]
    --[[-- Use CSS style to center image]]
    --[[elem.attributes.style = 'margin:auto; display: block;']]
    --[[return elem]]
  --[[end]]
--[[end]]
