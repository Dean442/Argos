package akros.projectoverview.Argos.api.services.documentservices;

import akros.projectoverview.Argos.persistence.entities.documents.MandateDocument;

import akros.projectoverview.Argos.persistence.repositories.MandateRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class MandateService {

    @Autowired
    private MandateRepository mandateRepository;

    public Optional<MandateDocument> findMandateById(String id) {
        return mandateRepository.findById(id);
    }

    public List<MandateDocument> findAllMandates() {
        return mandateRepository.findAll();
    }

    public MandateDocument saveNewMandate(MandateDocument mandate) {
        return mandateRepository.save(mandate);
    }

    public void deleteMandate(String id) {mandateRepository.deleteById(id);}
}
