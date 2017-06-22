declare namespace lido="http://www.lido-schema.org";
for $document in collection("sweden-clean") 
let $x := $document//lido:recordID/text()
let $credit := $document//lido:rightsWorkSet/lido:creditLine/text()
let $y := $document//lido:resourceRepresentation[@lido:type = 'image_thumb']
order by ($x)
return string-join((
    $document//lido:recordID/text(), 
    ",", 
    $document//lido:titleSet/lido:appellationValue,
     ",", 
    $document//lido:nameActorSet/lido:appellationValue,
    ",",
    $document//lido:earliestDate/text(),
    ",",
    $document//lido:objectWorkType//lido:term/text(),
    ",",
    $document//lido:inscriptions/lido:inscriptionTranscription/text(),
	",",
    $document//lido:nameActorSet/lido:appellationValue,
    ",",
    $document//lido:eventMaterialsTech/lido:displayMaterialsTech/text(),
    ",",
     ($document//lido:measurementsSet/lido:measurementValue/text())[1],
    "-",
    ($document//lido:measurementsSet/lido:measurementValue/text())[2],
   ",",
  
    ",",
    $y/lido:linkResource/text()
  ))
