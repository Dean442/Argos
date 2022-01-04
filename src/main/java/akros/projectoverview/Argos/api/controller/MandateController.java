package akros.projectoverview.Argos.api.controller;

import akros.projectoverview.Argos.api.services.ServiceLocator;
import akros.projectoverview.Argos.persistence.entities.documents.IdList;
import akros.projectoverview.Argos.persistence.entities.documents.MandateDocument;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@RestController
@Tag(name = "mandates", description = "Mandate controller")
@RequiredArgsConstructor
@RequestMapping(path = "/mandate")
public class MandateController {

    private final ServiceLocator serviceLocator;

    @CrossOrigin()
    @GetMapping(path = "/{id}")
    public ResponseEntity<MandateDocument> getMandate(@PathVariable String id) {

        var temp = serviceLocator.findMandateById(id);
        if(temp.isEmpty()) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }

        final var mandate = temp.get();
        return new ResponseEntity<>(mandate, HttpStatus.OK);
    }

    @CrossOrigin()
    @GetMapping(path = "/allMandates")
    public ResponseEntity<List<MandateDocument>> getAllMandates() {
        final var allMandates = serviceLocator.findAllMandates();
        return new ResponseEntity<>(allMandates, HttpStatus.OK);
    }

    @CrossOrigin()
    @PostMapping(path = "/mandatesByIds")
    public ResponseEntity<List<MandateDocument>> getMandatesByIds(@RequestBody IdList mandateIds) {
        log.info("mandateIds: " + mandateIds);
        List<MandateDocument> collection = new ArrayList<>();
        mandateIds.getIds().forEach(id -> {
            log.info(id);
            final var optional = serviceLocator.findMandateById(id);
            optional.ifPresent(collection::add);
        });
        log.info(collection.toString());
        return new ResponseEntity<>(collection, HttpStatus.OK);
    }

    @CrossOrigin()
    @PostMapping(path = "/newMandate")
    public ResponseEntity<MandateDocument> addNewMandate(@RequestBody MandateDocument mandate) {
        mandate.setId(null);
        final var newMandate = serviceLocator.saveNewMandate(mandate);
        return new ResponseEntity<>(newMandate, HttpStatus.ACCEPTED);
    }

    @CrossOrigin()
    @PutMapping(path = "/{id}")
    public ResponseEntity<MandateDocument> updateMandate(
            @PathVariable String id,
            @RequestBody MandateDocument mandate) {
        var oldMandateOptional = serviceLocator.findMandateById(id);
        if(oldMandateOptional.isEmpty()) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
        final var oldMandate = oldMandateOptional.get();
        final var newMandate = mergeMandates(mandate, oldMandate);

        final var updatedMandate = serviceLocator.saveNewMandate(newMandate);
        return new ResponseEntity<>(updatedMandate, HttpStatus.OK);
    }

    @CrossOrigin()
    @DeleteMapping(path = "/{id}")
    public ResponseEntity<MandateDocument> deleteMandate(
            @PathVariable String id) {
        final var deletedMandate = serviceLocator.findMandateById(id).get();
        serviceLocator.deleteMandate(id);
        return new ResponseEntity<>(deletedMandate, HttpStatus.OK);
    }



    private MandateDocument mergeMandates(MandateDocument mandate, MandateDocument oldMandate) {
        return MandateDocument.builder()
                .id(mandate.getId() != null ? mandate.getId() : oldMandate.getId())
                .employee(mandate.getEmployee() != null ? mandate.getEmployee() : oldMandate.getEmployee())
                .projectId(mandate.getProjectId() != null ? mandate.getProjectId() : oldMandate.getProjectId())
                .startDate(mandate.getStartDate() != null ? mandate.getStartDate() : oldMandate.getStartDate())
                .endDate(mandate.getEndDate() != null ? mandate.getEndDate() : oldMandate.getEndDate())
                .description(mandate.getDescription() != null ? mandate.getDescription() : oldMandate.getDescription())
                .happiness(mandate.getHappiness() != 0 ? mandate.getHappiness() : oldMandate.getHappiness())
                .build();
    }
}
